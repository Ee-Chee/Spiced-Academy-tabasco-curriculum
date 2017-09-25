// ------------------------------------------------------------------
// EXAMPLE - Easy Prompt ------------------------------------------
// ------------------------------------------------------------------


var readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What\'s your birthday?\n", (answer)=>{
    console.log("OK, on " + answer + " I will wish you a happy birthday!")
    //rl.close()
})
