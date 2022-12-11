#!/usr/bin/bash

# Check if node exists
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed.' >&2
  exit 1
fi


# Installing yarn 
if ! [ -x "$(command -v yarn)" ]; then
  npm i -G yarn
fi

# prepare client 
cd client 

yarn install 
yarn run build

# prepare server
cd ../api

#yarn install 
touch .env
cat env-sample.txt > .env

nano .env

yarn run prismaInit
yarn run build


echo "All done..."
echo "To continue, please run yarn start"