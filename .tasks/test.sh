#!/bin/bash

# Test script runs yarn test and looks for the 'Failed Tests' string, returning an error exit code if found.
# Necessary because tap test reporters don't ever return an error code.

echo "starting tests"

#2>&1 saves both the stderr and stdout to the variable.
output=$(yarn test 2>&1)

if [ $? -ne 0 ]
then
  echo "yarn test exited with $?"
  echo -e "$output"
  exit 1
fi

echo "Test command exited successfully. Checking tap-reporter output for failed tests."

echo "$output" | grep 'Failed Tests' && exit 1 || exit 0;