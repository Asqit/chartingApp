#!/usr/bin/bash

if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed.' >&2
  exit 1
fi


cd ./client
npm install 
npm run build

cd ../api
npm install 

cat env-sample.txt > .env

echo "done..."
echo "To continue, please edit .env file with your values, the file is in api folder"
echo "After that run yarn/npm run prismaInit"
echo "And finaly run yarn/npm start"