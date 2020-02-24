#!/bin/sh

YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# test if config.json already exists
if test -f ../config.json; then
    exit
fi

cat <<EOT > ../config.json
{
    "telegram": {
        "bot_token": "",
        "webhook_secret": ""
    },
    "gcp": {
        "datacenter": "us-central1",
        "project_id": ""
    }
}
EOT

printf "📣 ${YELLOW}config.json file generated. Fill all fields before deploying to Firebase!${NC}\n"
