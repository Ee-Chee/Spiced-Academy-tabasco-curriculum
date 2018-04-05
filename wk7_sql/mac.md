In order to use psql, createdb, etc., from any directory, you need to update your `PATH` environment variable to include the directory that contains them. The `PATH` is a list of directories that is searched for a match when you type a command in the Terminal.

1. ##### Find the path to psql

    Postgres.app should be in `/Applications/Postgres.app/` and the directory containing psql will be several levels deeper. If you were using version 9.5 of PostgreSQL, the path would most likely be:
     ```
     /Applications/Postgres.app/Contents/Versions/9.5/bin
     ```
     If you were using version 9.6, the path would most likely be:
     ```
     /Applications/Postgres.app/Contents/Versions/9.6/bin
     ```
     You'll have to look around in there to find the exact directory. A more direct approach would be to use the `find` command:
    ```
    sudo find / -name psql
    ```

2. ##### Open `.bash_profile` with nano
    `.bash_profile` is a script that lives in your home directory and is automatically executed every time you start your Terminal. It is a convenient place to update your `PATH`.

    nano is an easy-to-use text editor. To open `.bash_profile` with it, type the following:

    ```
    nano ~/.bash_profile
    ```
3. ##### Add a line to the file that looks like the following:
    ```
    PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.6/bin
    ```

    The actual file path you put after the colon should be the path to psql you found in the first step.

    What this line is doing is setting `PATH` to be its current value plus the path to psql.

4. ##### Hit `ctrl + x` to exit nano.
    You will be asked if you want to save the file and you should say yes. If you are asked to give a name for the file, make sure that you type `.bash_profile` exactly.

5. ##### Run `.bash_profile` again

    You can do this by typing the following command:

    ```
    source ~/.bash_profile
    ```

    Alternatively, you can just quit Terminal and restart it.

You should now be able to type psql to launch the program.
