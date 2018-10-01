#!/bin/sh

# Creates zip out of /lib folder. This can be used only if none of the node_modules packages are required on aws lambda
# Locally node packages are being used.
# By default this script assumes that:
#  - lambda function name is the root folder name



BUILD_FOLDER=build
SRC_FOLDER=lib
EXECUTION_FOLDER=${PWD}

COMMAND=$1

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
#echo $DIR
PROJECT_NAME="$(basename "$(dirname "${DIR}")")"
ARTIFACT_FILE="$( cd "$( dirname "${DIR}" )/${BUILD_FOLDER}/" >/dev/null && pwd )/${PROJECT_NAME}-$(date +%Y%m%d-%H%M%S).zip"
SRC_FOLDER_PATH="$( cd "$( dirname "${DIR}" )/${SRC_FOLDER}/" >/dev/null && pwd )"


usage () {
  printf "\\nUsage:\\n\\n"
  printf "%s a|p <filepath>|z \\n\\n" "$0"
  printf "\\ta: creates zip file in build folder as %s-$(date +%Y%m%d-%H%M%S).zip and publishes it to aws %s lambda function after confirmation\\n" "${PROJECT_NAME}" "${PROJECT_NAME}"
  printf "\\tp <filepath>: publishes given file to aws %s function\\n" "${PROJECT_NAME}"
  printf "\\tz: creates zip file in build folder as %s-$(date +%Y%m%d-%H%M%S).zip\\n\\n" "${PROJECT_NAME}"
  printf "Note: this script assumes that the lambda funciton name is identical to the project root folder name\\n"
  exit 9
}


create_zip () {
    echo "Creating artifact of folder: ${SRC_FOLDER_PATH}"
    if ! cd "${SRC_FOLDER_PATH}"; then
        echo "Could not cd to ${SRC_FOLDER_PATH}"
        exit 1
    fi 

    #zip -r9 -q ${ARTIFACT_FILE} * -x *.git* node_modules/typescript\* node_modules/tslint\* node_modules/ajv/dist\*
    zip -r9 "${ARTIFACT_FILE}" ./*
    cd "${EXECUTION_FOLDER}"
    echo "Done: ${ARTIFACT_FILE}"
}

publish_zip () {
    echo "Updating [${PROJECT_NAME}] function... Artifact: $1"
    read -rp "Continue: [Yy]? " -n 1
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
      echo "Update aborted: [${PROJECT_NAME}]"
      exit 1
    fi
   # #https://www.chrisjmendez.com/2017/02/19/aws-lambda-on-osx/
    aws lambda update-function-code \
    --function-name "${PROJECT_NAME}" \
    --zip-file fileb://"$1" \
    --publish
    
    echo "Done: ${ARTIFACT_FILE}"
}

[[ -z "$COMMAND" ]] && usage;

case "$COMMAND" in
  a) create_zip
     publish_zip "${ARTIFACT_FILE}"
     ;;
  z) create_zip
     ;;
  p) publish_zip "$2"
     ;;
  *) echo "Unknown parameter: $COMMAND. Must use a,z or p"
     usage
     ;;
esac

