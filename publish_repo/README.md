If you want to post your projects (petition, social network, etc.) to your public Github account, you can follow these steps. Note that, if you follow these instructions, your complete commit history will be preserved in your new repository.

1. Log in to [github.com](https://github.com) and create a new public repository. Copy the url for your repo into your clipboard.

2. On your local machine, `cd` into your local repository.

3. Add the new repository as a remote by typing `git remote add ` followed by the name you would like to use for this remote locally (e.g., 'public' or 'portfolio') and then another space followed by the repo url in your clipboard. Hit enter.

4. Confirm that you are on your own branch by typing the following:
   ```
   git branch
   ```
   This command will show you a list of branches with a star next to the current one. Make sure it is yours. 

5. Push to your new remote.
   ```
   git push public HEAD:master
   ```

If you'd like to blow away your commit history, giving the appearance that your project materialized fully formed, follow these steps.

1. Log in to [github.com](https://github.com) and create a new public repository.

2. On your local machine, `cd` into your local repository

3. Confirm that you are on your own branch by typing the following:

   ```
   git branch
   ```

   This command will show you a list of branches with a star next to the current one. Make sure it is yours. You should also make sure you have pushed everything to the remote before continuing to the next step.

4. Convert your local repo from a git repository to just a normal directory by deleting the hidden `.git` directory: 

   ```
   rm -rf .git
   ```

5. Convert the directory back into a git repo:

   ```
   git init
   ```

6. Add and commit everything

   ```
   git add .
   git commit -m "my petition project"
   ```

7. Back at github.com, copy the url for your repo into your clipboard

8. On your local machine, type `git remote add origin ` followed by the url in your clipboard and hit enter.

9. `git push origin master`

   ​
