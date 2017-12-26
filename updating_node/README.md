# Author

David Scheier, Ginger

## Instructions

Hey fellow windows users, I just updated my node and npm and I wanted to share with you how to do that quick and easy, step by step.

You can check your current versions with `node -v` and `npm -v` in your CLI.

1. Run Powershell as an admin (press windows-key, enter "powershell", right click on "Windows PowerShell", choose "Run as an admin")


1. Execute the following command in your powershell cli: 

`Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force`

1. To update npm, you want to install the npm windows upgrade module once, then you can just run it whenever you want to update npm:

to install:

```
npm install --global --production npm-windows-upgrade
```

to update: 

```
npm-windows-upgrade
```

1. To update node, you could download from the website and use the installer ,

OR you can just enter the following line in your powershell (because all you need is the node.exe):

`wget `[`https://nodejs.org/download/release/latest/win-x64/node.exe`](https://nodejs.org/download/release/latest/win-x64/node.exe)` -OutFile 'C:\Program Files\nodejs\node.exe'`

And you're done in 10 seconds.

Make sure that the last part goes to you node installation, so your path might differ from mine. 

Also, you need to close all CLIs that run node before this update will work. 

Enjoy