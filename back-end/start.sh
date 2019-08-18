#!/bin/bash

tailf /dev/null
python3 migration.py db init
python3 migration.py db migrate
python3 migration.py db upgrade
python3 app.py