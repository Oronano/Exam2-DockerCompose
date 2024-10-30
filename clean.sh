#!/bin/bash

if [ "$1" == "bdd" ]; then
  docker-compose down
  docker volume prune -f
elif [ "$1" == "all" ]; then
  docker-compose down -v --remove-orphans
  docker volume prune -f
  rm -rf ./myapp-back/node_modules
  rm -rf ./frontend/node_modules
else
  echo "Usage: $0 {bdd or all}"
fi
