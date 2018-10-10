Open Bash and enter the following commands:

1. #### `sudo apt install postgresql`
    This command installs Postgres.
2. #### `sudo service postgresql start`
    This command starts Postgres. Remember it since you will have to enter it again (for example, after you restart your computer).
3. #### `sudo su postgres`
    This command logs you in as the user named postgres which was created during installation. This user has permission to do anything that can be done in Postgres.
4. #### `createuser -s funkychicken`
    Replace "funkychicken" with your own Ubuntu username. This command creates a Postgres user that has permission to create tables, drop tables, etc.
5. #### `exit`
   This command makes you stop being the user named postgres. You will go back to being yourself but now there is a Postgres user with your username.
6. #### `createdb funkychicken`
    Replace "funkychicken" with your own Ubuntu username. The creates a database with the same name as you. After you do this, you should be able to type `psql` and launch the command-line interface for the database with the same name as you. 
