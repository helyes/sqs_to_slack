#!/bin/sh
FUNCTION_NAME="sqs_to_slack"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
EVENT_FILE=${DIR}/events/$1
OUTPUT=output.txt

aws lambda invoke \
--function-name ${FUNCTION_NAME} \
--payload "file://${EVENT_FILE}" \
--region ap-southeast-2 ${OUTPUT}; \
bat ${OUTPUT};

