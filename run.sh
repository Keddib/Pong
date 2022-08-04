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
    docker compose down && docker system prune -a;
		exit 0;
	elif [[ "$1" != "up" && "$1" != "build" ]]; then
		echo "${RED}invalid option${RESET}";
		exit 1;
	fi
elif (( $# > 2 ))
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

echo 'checking services ...';

if [ ! -d "services/Front" ];
	then
		echo 'cloning front end...';
 		git clone https://github.com/Keddib/Pong-Frontend.git services/Front;
fi

if [ ! -d "services/Users" ];
	then
		echo 'cloning users...';
 		git clone https://github.com/illusionist99/Backend.git services/Users;
fi

if [ ! -d "services/Game" ];
	then
		echo 'cloning game..';
 		git clone -b deploy https://github.com/YahyaOukharta/nest-ws-pong.git services/Game;
fi

# echo "creating database volume";

# if [ ! -d "/goinfre/$USER/Data" ]; then
# 	mkdir /goinfre/$USER/Data/
# fi


if [[ "$1" == "up" && "$2" == "-p" ]]; then
    echo "puling services"
		echo 'pulling from front end...';
		cd services/Front ; git pull ;  cd $OLDPWD;
		echo "pulling from users...";
		cd services/Users ; git pull ;  cd $OLDPWD;
		echo "pulling from Game..."
		cd services/Game ; git pull ;  cd $OLDPWD;
fi

if [ "$1" == "up" ]; then
	docker compose up;
elif [ "$1" == "build" ]; then
	docker compose up --build
elif [ ! "$1" ]; then
	echo " RUN.SH -- OPTIONS ";
	echo "up : to run services up";
	echo "up -p : to pull services before running services up";
	echo "down : to shut services down";
	echo "build : to run services up with build";
	echo "clear : to shut services down and clear all images";
fi
