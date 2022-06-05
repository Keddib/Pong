#!/bin/bash

BLUE=$'\e[0;34m'
RED=$'\e[0;31m'
GREEN=$'\e[0;32m'
YELLOW=$'\e[1;33m'
RESET=$'\e[0m'

# Ensure USER variabe is set
[ -z "${USER}" ] && export USER=$(whoami)

# get argument

if (( $# == 1 ))
then
	if [[ "$1" == "down" ]]; then
		docker compose down;
		exit 0;
	elif [[ "$1" == "clear" ]]; then
		echo "stop services and delete containers ...";
		exit 0;
	elif [[ "$1" != "up" && "$1" != "build" ]]; then
		echo "${RED}invalid option${RESET}";
		exit 1;
	fi
elif (( $# > 1 ))
then
	echo "${RED}Error : too many arguments${RESET}";
	exit 1;
fi


pgrep -x docker >/dev/null;

dockerprocees=$?

if  test $dockerprocees -ne 0
  then
		echo "${RED}Docker is not running . Please run docker.
${YELLOW}ps : if you are on Imac(school) run inti_docker${RESET}";
		exit;
  else
		echo "${BLUE}docker is running${RESET}";
fi

echo 'cloning repos';

if [ ! -d "Pong" ]; then
	echo 'cloning front end';
 	git clone https://github.com/Keddib/example_app.git Front;
fi

echo "creating database volume";

if [ ! -d "/goinfre/$USER/Data" ]; then
	mkdir /goinfre/$USER/Data/
fi


if [ "$1" == "up" ]; then
	docker compose up -d;
elif [ "$1" == "build" ]; then
	docker compose up --build
fi
