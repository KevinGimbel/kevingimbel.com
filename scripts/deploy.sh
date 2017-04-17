#!/bin/bash

# Defined in ~/.ssh/config
remote_host="kvngmbl"
remote_path="/home/kvngmbl/subdomains/html"
local_source="public"
live_url="https://kevingimbel.com"

echo "Preparing deploy"
echo "========================="

echo "Building website"
echo "========================="

hugo -b="$live_url" && echo "Done"

echo "Uploading new files"
echo "========================="
cd $local_source && rsync -r -v . $remote_host:$remote_path && echo "Done"

echo "Update done. Your site is now live at $live_url"
