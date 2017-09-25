# An introduction to the command line

All operating systems come with a command line program. When you open this program, you will probably see some text and a cursor blinking, but not much else. So what are we looking at?

The command line is nothing but a different way of doing things on your computer. On it, you can do a lot of things (but also more) you would otherwise do with your mouse, clicking on graphical user interface programs such as your browser or your file explorer. For example, you can create and open files, move things around, and start programs. Depending on the program, they will either open on your GUI or on the command line.

It used to be that computers were really big and expensive devices that users would control from [a sort of typewriter](https://en.wikipedia.org/wiki/VT100) that would send messages to computer and display the messages they got back from the computer. These days, in contrast, your computer sits right under your keyboard and you can type whatever you need right into it. The terminal has turned from a device into a program, but it has kept much of its original mechanics as well as the name.  And since it continues to stand the test of time, developers keep relying on it!

## What is the command line?

The *terminal* allows you to interact with a part of your operating system (the *shell*) which then tells the kernel of the operating system what to do. When you start typing commands into the terminal, you are typing a *command line*. Even though these three words - *terminal, command line, shell* - have different technical meanings, they are often used interchangeably in everyday use to mean the program you open and type your commands into.

When you open your command line, you'll probably see something like this:

```
your-user-name@the-name-of-your-computer: ~$
```

The "~" stands for your home directory. This is the directory you are currently in. The "$" is your command line saying "I'm listening, please talk to me!".

## Working with file paths

On a unix system, every user has a directory in the `/home` directory. So if your user name is Alice, that is also your home directory's name. In it, you will find all your stuff, such as `Desktop/` or `Downloads/`.

On the command line, you will be working with relative and absolute paths. An absolute path is one that is specified from the root of the file system, for example

```
/home/alice/dev/intro-to-the-command-line.md
```

A relative path, on the other hand, starts from where you currently are. If we are in Alice's home directory, that means:

```
dev/intro-to-the-command-line.md
```

But what if a directory or file we want to refer to is a level up from where we are?  Let's say we are currently in `/home/alice/dev/test-project/` and want to refer to this file.  We use `..` to get up to the `dev` directory and from there specify the file.

```
../intro-to-the-command-line.md
```

Need to go two levels up? `../..` takes you there. And so on.

## How to do stuff on the command line

The name of the shell on your computer is most likely BASH. This is also the name for the language we use so the terminal knows what we want to do. When you run a command/ program in bash you are referencing the name of a file. Bash knows where to look up that file and then runs it for you. For example, try running

```
echo hello world!
```

Echo is the name of a file on your computer with the `echo` program in it.

Notice that each command consists of a program name and a list of arguments. In our example, `echo` is the program, and `hello world!` is its argument. Arguments can be simple strings/paths, switches/flags or key-value-pairs:

```
touch hello.txt
atom index.html
rm -r trash-directory
mv hello.txt ~
```

Can you guess what these commands do?

## Bash programs you will use often

The list of the small programs that come with Bash is [long](http://ss64.com/bash/). Here are the ones you will probably use most often.

- `pwd` - *print working directory* - this will show you your current location in the directory structure
- `ls` - *list* - lists all files and directories. when used with `-a` it will also show you hidden files ("dotfiles")
- `cat` - *concatenate* - print the content of a file to the terminal, i.e. `cat hello.txt`
- `cd` - *change directory* - used to switch to a different directory. for example `cd dev/myproject`, `cd ..` or `cd ~`
- `touch`  - will create an empty file with the name you specify. for example, `touch index.html`
- `mkdir` - *make directory* - creates a directory with the name you specify, for example `mkdir images`
- `rm` - *remove* - removes a file or directory (when used with `-r`). for example `rm index.html`
- `mv` - *move* - used to move or rename files. first specify the file, then the place you want to move it to or its new name.
- `man` - *manual* - when used with a command, shows you a help file. try `man ls`
- `ps` - *process status* - get a list of all running programs/processes
- `sudo` - *super user do* - executes a command as the super user. i.e. `sudo rm very-important-file.txt`

 ![](http://imgs.xkcd.com/comics/sandwich.png)

## Some tips

- When using bash commands, try to "think them out loud" in your head. This will help you remember what the abbreviations stand for. So, when you type `ls -a`, in your head, say "list all".

- Cursor/arrow up shows you your last typed commands. No need to type repetitive stuff again.

- The tab key autocompletes file names so that you can be sure they are really where you think they are and there are no typos. Always autocomplete!

- `sudo !!` repeats your last command and prefixes `sudo`

- typing only `cd` automatically takes you to your home directory

- Using pipes (`|`) and I/O redirection, you can redirect the output of one Unix program into the input of another unix program. Try running the following and then use `ls` and `cat` to see what happened.

  ```
  echo Hello world! > hello.txt
  ```

## Recommended viewing

In [this video](https://www.youtube.com/watch?v=tc4ROCJYbm0Neat ) from 1982, UNIX developers talk about how to use the command line for everyday work. Unlike their fashion choices, the terminal software they created has really stood the test of time!

## Recommended reading
For a much more in-depth introduction to the command line, see [this book](https://sourceforge.net/projects/linuxcommand/files/TLCL/16.07/TLCL-16.07.pdf/download?use_mirror=netix).
