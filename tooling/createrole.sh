#!/bin/sh
role_name="lambda-vpc-execution-role"
role_policy_arn="arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"

aws iam create-role \
    --role-name "lambda-vpc-execution-role" \
    --assume-role-policy-document file://policy_assumerole.json
aws iam attach-role-policy \
    --role-name "${role_name}" \
    --policy-arn "${role_policy_arn}"