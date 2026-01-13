#!/usr/bin/env sh

# This file is sourced by husky hooks to set up the environment

# Exit if not in a git repository
if [ ! -d .git ]; then
  echo "Not in a git repository"
  exit 1
fi

# Get the git directory
if [ -z "${GIT_DIR}" ]; then
  export GIT_DIR="$(git rev-parse --git-dir)"
fi

# Set PATH to include node_modules binaries
if [ -d "client/node_modules/.bin" ]; then
  export PATH="client/node_modules/.bin:$PATH"
fi
