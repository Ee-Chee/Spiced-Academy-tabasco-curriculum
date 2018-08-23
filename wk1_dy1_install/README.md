## Install Git

### macOS

If you are using a relatively recent version of macOS it is quite likely that you already have Git installed. If you open Terminal (you can do this by typing command + spacebar to open spotlight search and then typing _terminal_ to find the program) and type _git_ you will see a list of commands if Git is installed. If Git is not installed you will prompted to install it.

You can also install Git from <a href="http://git-scm.com/download/mac.">http://git-scm.com/download/mac</a>.

### Windows

Download and install Git from <a href="https://git-for-windows.github.io/">https://git-for-windows.github.io/</a>

## Configure git

When you've made sure git is installed, you should set it up correctly by following [these instructions](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup#Your-Identity).

## Add your public SSH key to your Github account [OPTIONAL]

Github has instructions for generating and adding an SSH key for both <a href="https://help.github.com/articles/generating-an-ssh-key/#platform-mac">macOS</a> and <a href="https://help.github.com/articles/generating-an-ssh-key/#platform-windows">Windows</a>. After you add your key, you will be able to take actions on your remote repositories at Github without having to enter your username and password repeatedly.

## Install Node

Go to <a href="https://nodejs.org">nodejs.org</a> and install <a href="https://nodejs.org/dist/v8.11.2/node-v8.11.4.pkg">v8.11.4</a>. Installation should be straightforward on both macOS and Windows.

## Set up ESLint in Atom

A linter is a program that analyzes your code and identifies potential errors and violations of stylistic rules. ESLint is a Javascript linter and linter-eslint is an a package that integrates it into Atom. To install, follow these steps:

1. Install ESLint program on your computer. By typing the following on the command line:


    ```
    npm install -g eslint@4
    ```

2. Download our [configuration file](https://gist.github.com/spicedacademy/c846c627c4df1bcd255c7bf6eb92a15a) for linter-eslint by pasting the following into your command line:

   ```
   curl https://gist.githubusercontent.com/spicedacademy/c846c627c4df1bcd255c7bf6eb92a15a/raw/2d7262cbff80936fd721678d8c98c89c3b0e8a05/.eslintrc.json > ~/.eslintrc.json
   ```

3. In Atom, go to Preferences > Packages > Install (MacOS) or Settings > Packages > Install (Windows). Search for the "linter-eslint" package and install it. The package has dependencies (other packages that it needs in order to function correctly) and you will be prompted to install these as well.

To test if everything works, create JavaScript file in Atom, type some JavaScript and omit a semicolon or a closing curly brace. When you save the file, ESLint should warn you about these errors.

## Exercises

It would probably be a good idea to review the <a href="https://www.codecademy.com/learn/learn-the-command-line">Command Line</a> and <a href="https://www.codecademy.com/learn/learn-git">Git</a> lessons at <a href="https://www.codecademy.com">codecademy.com</a>. You may also want to review and bookmark these cheat sheets:

<a href="https://www.git-tower.com/blog/command-line-cheat-sheet/">Command Line Cheat Sheet</a>

<a href="https://www.git-tower.com/blog/git-cheat-sheet/">Git Cheat Sheet</a>
