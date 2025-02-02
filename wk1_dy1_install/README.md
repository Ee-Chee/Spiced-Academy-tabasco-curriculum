_Note to Windows 10 users_: It is highly recommended that you follow [these instructions](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to install [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install-win10) before proceeding. WSL makes it possible to run Linux programs on your Windows machine. This will make installations of much of the software we use easier, and in the immediate term, allow you to run [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)). Without WSL, you will be stuck using Git-Bash, a sort of fake Bash that comes with Git for Windows.

WSL requires Window 10 [build 16215 or later](https://docs.microsoft.com/en-us/windows/wsl/troubleshooting#check-your-build-number) and something like 1GB of free disk space to install the distro you choose. It is recommended and assumed that you will choose [Ubuntu](https://www.microsoft.com/store/p/ubuntu/9nblggh4msv6).

## Install Git

### macOS

If you are using a relatively recent version of macOS it is quite likely that you already have Git installed. If you open Terminal (you can do this by typing command + spacebar to open spotlight search and then typing _terminal_ to find the program) and type _git_ you will see a list of commands if Git is installed. If Git is not installed you will prompted to install it.

You can also install Git from <a href="http://git-scm.com/download/mac.">http://git-scm.com/download/mac</a>.

### Windows

#### If you are running WSL/Ubuntu:
Start bash by running cmd.exe and typing

```
bash
```
Then type
```
sudo apt-get install git
```

#### If you cannot install WSL:

Download and install Git from <a href="https://git-for-windows.github.io/">https://git-for-windows.github.io/</a>. This will also install Git-Bash, which you will use for your command line.

## Configure Git

When you've made sure Git is installed, you should set it up correctly by following [these instructions](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup#Your-Identity). The important commands to run are the following.

```
git config --global user.name "YOUR NAME"
```
```
git config --global user.email YOUREMAIL@example.com
```
```
git config --global core.editor nano
```

Nano is a command line text editor that is easier to use than the alternatives.

## Add your public SSH key to your Github account [OPTIONAL]

Github has instructions for generating and adding an SSH key for both <a href="https://help.github.com/articles/generating-an-ssh-key/#platform-mac">macOS</a> and <a href="https://help.github.com/articles/generating-an-ssh-key/#platform-windows">Windows</a>. After you add your key, you will be able to take actions on your remote repositories at Github without having to enter your username and password repeatedly.

## Install Node

Go to <a href="https://nodejs.org">nodejs.org</a> and install v10.15.1. Installation should be straightforward on both macOS and Windows.

_Note to WSL users_: There is currently a bug that prevents a Windows installation of Node from running when it is evoked from Bash. If you would like to run Node from Bash, you should also install it there.

```
sudo apt install nodejs
```
```
sudo apt install npm
```

## Set up ESLint in Atom

_Note to WSL users_: You should open a new instance of Windows PowerShell to follow these steps. Do not do them in Bash.

A linter is a program that analyzes your code and identifies potential errors and violations of stylistic rules. ESLint is a Javascript linter and linter-eslint is an a package that integrates it into Atom. To install, follow these steps:

1. Install ESLint by typing the following on the command line:


    ```
    npm install -g eslint@4
    ```

2. Download our [configuration file](https://gist.github.com/spicedacademy/c846c627c4df1bcd255c7bf6eb92a15a) for linter-eslint by pasting the following into your command line if you are a MacOS or Git-Bash user:

   ```
   curl https://gist.githubusercontent.com/spicedacademy/c846c627c4df1bcd255c7bf6eb92a15a/raw/2d7262cbff80936fd721678d8c98c89c3b0e8a05/.eslintrc.json > ~/.eslintrc.json
   ```
   
   WSL users should paste the following line into PowerShell:
   
   ```
   wget https://gist.githubusercontent.com/spicedacademy/c846c627c4df1bcd255c7bf6eb92a15a/raw/2d7262cbff80936fd721678d8c98c89c3b0e8a05/.eslintrc.json -out ~/.eslintrc.json
   ```

3. In Atom, go to Preferences > Install (MacOS) or Settings > Install (Windows). Search for the "linter-eslint" package and install it. The package has dependencies (other packages that it needs in order to function correctly) and you will be prompted to install these as well.

To test if everything works, create a JavaScript file in Atom, type some JavaScript and omit a semicolon or a closing curly brace. When you save the file, ESLint should warn you about these errors.

## Exercises

It would probably be a good idea to review the <a href="https://www.codecademy.com/learn/learn-the-command-line">Command Line</a> and <a href="https://www.codecademy.com/learn/learn-git">Git</a> lessons at <a href="https://www.codecademy.com">codecademy.com</a>. You may also want to review and bookmark these cheat sheets:

<a href="https://www.git-tower.com/blog/command-line-cheat-sheet/">Command Line Cheat Sheet</a>

<a href="https://www.git-tower.com/blog/git-cheat-sheet/">Git Cheat Sheet</a>
