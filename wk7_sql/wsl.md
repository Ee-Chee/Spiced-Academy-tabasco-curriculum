Open Bash and enter the following commands:

1. #### `sudo apt install postgresql`
    This command installs Postgres.
2. #### `sudo service postgresql start`
    This command starts Postgres. Remember it since you will have to enter it again (for example, after you restart your computer).
3. #### `sudo su postgres`
    This command logs you in as the user named postgres which was created during installation.
4. #### `psql`
    This command runs the Postgres command line interface. If you receive an error because there is no database named postgres, type `createdb postgres` and try again.
5. #### `\password`
    Enter "postgres" for the new password and then confirm.
6. #### `\q`
    This command quits the Postgres command line interface.
7. #### `createuser -s funkychicken`
    Replace "funkychicken" with your own Ubuntu username. The effect of this command will be to create a Postgres user with the same name as you.
8. #### `exit`
   This command makes you stop being the user named postgres. You will go back to being yourself but now there is a Postgres user with your username.
9. #### `createdb funkychicken`
    Replace "funkychicken" with your own Ubuntu username. The creates a database with the same name as you. After you do this, you should be able to type `psql` and launch the command-line interface for the database with the same name as you. 
