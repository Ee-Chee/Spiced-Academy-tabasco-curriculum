## Create and set up your Github account

1. If you do not have a Github account, go to https://github.com/ and create one. 

2. After you create your account you will have to add an SSH key to it. Github has instructions for generating and adding an SSH key for both <a href="https://help.github.com/articles/generating-an-ssh-key/#platform-mac">macOS</a> and <a href="https://help.github.com/articles/generating-an-ssh-key/#platform-windows">Windows</a>.

## Install Git

### macOS

If you are using a relatively recent version of macOS it is quite likely that you already have Git installed. If you open Terminal (you can do this by typing command + spacebar to open spotlight search and then typing _terminal_ to find the program) and type _git_ you will see a list of commands if Git is installed. If Git is not installed you will prompted to install it.

You can also install Git from <a href="http://git-scm.com/download/mac.">http://git-scm.com/download/mac</a>.

### Windows

Download and install Git from <a href="https://git-for-windows.github.io/">https://git-for-windows.github.io/</a>

## Configure git
When you've made sure git is installed, you should set it up correctly by following the instructions here: https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup#Your-Identity

You may also want to set Atom as your default editor by following these instructions: https://help.github.com/articles/associating-text-editors-with-git/.

## Install Node

Go to <a href="https://nodejs.org">nodejs.org</a> and install <a href="https://nodejs.org/dist/v6.11.2/node-v6.11.2.pkg">v6.11.2</a>. Installation should be straightforward on both macOS and Windows.

## Set up ESLint in Atom
It's helpful to have a linter check your code's syntax when you save it so you can catch errors early. ESLint is a linter that does this and that can be plugged in to Atom as a package. Follow these steps:

1. Install the ESLint program on your computer. On the command line, type
  ```
  npm install -g eslint
  ```

2. You can tell ESLint exactly which rules you want enforced in the `.eslintrc.json` file. You should create this file in your home directory by typing the following on the command line:
  ```
  atom ~/.eslintrc.json
  ```
  **Note:** If you are on a Mac and typing `atom` gives you `Command not found`, but you are sure that you have Atom installed, then you should open up Atom, go the Atom menu and select "Install shell commands".

3. This will open the file in Atom. Then, paste the contents of [this file](./template-eslintrc.json) into the new file you just created. Be sure to select the raw content view and don't copy the line numbers. This file contains settings for the linter that make sense for beginners. You can modify the settings for ESLint anytime you wish and read more [here](http://eslint.org/docs/rules/).

4. As a last step, tell Atom to use ESLint. Go to Settings > Packages > Install, search for "linter-eslint" and install it. To test if everything works, create JavaScript file in Atom, type some JavaScript and omit a semicolon or a closing curly brace. When you save the file, ESLint should warn you about these errors.

## Exercises

It would probably be a good idea to review the <a href="https://www.codecademy.com/learn/learn-the-command-line">Command Line</a> and <a href="https://www.codecademy.com/learn/learn-git">Git</a> lessons at <a href="https://www.codecademy.com">codecademy.com</a>. You may also want to review and bookmark these cheat sheets:

<a href="https://www.git-tower.com/blog/command-line-cheat-sheet/">Command Line Cheat Sheet</a>

<a href="https://www.git-tower.com/blog/git-cheat-sheet/">Git Cheat Sheet</a>
