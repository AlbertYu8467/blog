#!/bin/sh
cd /Users/mac/Desktop/blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log 