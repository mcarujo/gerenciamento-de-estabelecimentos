#!/bin/bash

python3 migration.py db init
python3 migration.py db migrate
python3 migration.py db upgrade
python3 seed.py
python3 app.py