# Adventures with Node.js

Let's make a [text-based adventure game](https://www.youtube.com/watch?v=YCpr_QHAqks)!

![](./adventure.gif)

For your adventure, you can come up with any number of decisions and riddles. Set the scene and make it as big and difficult as you like!

In general, your game should work as follows:

1. When started, it should greet the player by name and ask them if they want to start.
2. When the player confirms, it should start asking the player questions, displaying the available options if appropriate.
3. It should react appropriately to the user's input. Your game shouldn't crash when the user input is something unexpected!
4. Once the game is complete, the program should end.

*Bonus 1*: Let your users pick the color of the questions by passing an argument when they start the game.

*Bonus 2*: Keep your game flexible. Changing the storyline shouldn't require changing your logic. It's advisable to keep your storyline in an object that looks something like this.

```javascript
var story = {
    q: "Welcome to The Land Of Wizards! Would you like to play?",
    answers: {
        "yes": {
            q: "You are alone in a dark forest and facing a fork in the road. Which direction do you turn?",
            answers: {
                left: {
                    q: "There's a scary wizard! He asks you a tough question. What's 1+1?",
                    answers: {
                        "2": "congratulations!"
                    }
                },
                right: "This was not the right choice. Goodbye!"
            }
        },
        "no": "Alright then. Enjoy your day!"
    },
};
```

## Helpful node modules

Node provides the [readline](https://nodejs.org/api/readline.html) module which lets you read from and write to command line. It is used like so

```javascript
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Do you enjoy learning Node.js?", function(answer) {
    if (answer === "yes") {
        console.log("great!");
    }
    rl.close();
});
```

A second, fun, module is [chalk](https://www.npmjs.com/package/chalk). You can use it to color your output!

```javascript
var chalk = require('chalk');
 
console.log(chalk.blue('Hello world!'));
```
In node,`process.env` is a big object which holds a lot of useful information about the environment your code is running in. You'll need it to complete this challenge so go ahead and take a look at it!
