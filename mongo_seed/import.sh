#!/bin/bash
export MONGO_ADMIN_USERNAME="root"
export MONGO_ADMIN_PASSWORD="example"
export MONGO_DATABASE="example"

mongoimport --host mongodb -u $MONGO_ADMIN_USERNAME -p $MONGO_ADMIN_PASSWORD --authenticationDatabase admin --db $MONGO_DATABASE --collection products --file /mongo_seed/list.json