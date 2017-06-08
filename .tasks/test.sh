#!/bin/bash

# Test script runs yarn test and looks for the 'Failed Tests' string, returning an error exit code if found.
# Necessary because tap test reporters don't ever return an error code.

echo "starting tests"
output=$(yarn test)

if [ $? -ne 0 ]
then
  exit $?
fi

echo "Test command exited successfully. Checking tap-reporter output for failed tests."

echo $output | grep 'Failed Tests' && return 1 || return 0;