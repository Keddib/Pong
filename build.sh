#!/bin/bash

docker-compose -f src/configDB/docker-compose.yml up & > /dev/null
nest start --watch
