#!/bin/bash
npm install
npm run build
docker build -t ucconnect/kong:latest .
docker push ucconnect/kong