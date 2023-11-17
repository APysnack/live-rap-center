# This was originally called env-vars.json. I changed to ruby to add comments
# steps to using local environment variables in lambda functions
# 1. The env var MUST be predeclared in the lambda's CFN template (even if its an empty values) e.g. AWS_REGION = ''
# 2. Rename this file env-vars.json, its already in the gitignore
# 3. The first key MUST be called Parameters as shown below
# 4. run sam local invoke --env-vars env-vars.json -e event/event.json to load event.json and env-vars
{
  "Parameters": {
    "AWS_REGION": "us-east-1",
  }
}
