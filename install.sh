#!/usr/bin/bash

# Quit if no NPM
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed.' >&2
  exit 1
fi


# Install yarn
if ! [ -x "$(command -v yarn)" ]; then
  npm i -g yarn
fi

# Prepare client
cd ./client
yarn install 
yarn run build

# Prepare server
cd ../api
yarn install 

cat env-sample.txt > .env

echo "done..."
echo "To continue, please edit .env file with your values, the file is in api folder"
echo "After that run yarn run prismaInit"
echo "And finaly run yarn start"