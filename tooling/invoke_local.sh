#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
FUNCTION_NAME="handler"
FILE="${DIR}/../lib/main.js"
EVENT_FILE=${DIR}/events/$1
#EVENT_JSON=`cat "${EVENT_FILE}" | tr '\n' ' '`
EVENT_JSON=$(cat "${EVENT_FILE}" | tr '\n' ' ')

# Loading dotenv here as it is not rewuired on aws
node -r dotenv/config -e "require(\"${FILE}\").${FUNCTION_NAME}(${EVENT_JSON})" dotenv_config_path="${DIR}/../.env"
