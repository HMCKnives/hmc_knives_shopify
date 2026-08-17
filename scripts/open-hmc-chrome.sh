#!/usr/bin/env bash
# Open URLs in the Jim / hmcknives.com Chrome profile
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
PROFILE_DIR="Profile 2"
URL="$1"
if [[ -z "$URL" ]]; then
  echo "Usage: $0 <url>" >&2
  exit 1
fi
exec "$CHROME" --profile-directory="$PROFILE_DIR" "$URL"
