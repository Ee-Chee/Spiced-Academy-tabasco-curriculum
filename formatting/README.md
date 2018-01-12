# Formatting

> "Programs must be written for people to read, and only incidentally for machines to execute."

> Harold Abelson, _The Structure and Interpretation of Computer Programs_

For the most part, Javascript doesn't care about whitespace in your code. Of course, spaces are used to determine what's what (e.g., saying `new Object();` is not the same as saying `newObject();`) but how many spaces you use does not matter.

```js
new Object();
```

is equivalent to

```js
new Object();
```

Similarly, except for in a handful of situations, line breaks in your code do not factor in to how it will be executed. For example, the following code snippets are all functionally equivalent.

```js
var a = 10;
```

```js
var a = 10;
```

```js
var a = 10;
```

Because of the casual attitude Javascript takes towards whitespace, you may be tempted to adopt a similar posture and not devote much attention to it. That would be a terrible mistake. It is _**absolutely critical**_ that you use whitespace in your code to communicate important information about its structure to its human readers. Without such visual indicators, it will be extremely difficult for anybody, including you yourself, to understand the code you've written.

While it is pretty much universally accepted that whitespace should be used in code consistently and in a manner that promotes understanding of how it works, there is considerable disagreement about many of the particulars of how to do this. A famous debate in this area centers upon how to indent code, whether to use tabs, two spaces, or four spaces.

Typically, teams of developers adopt an agreed-upon set of conventions to use on their project. It is of the utmost importance that you adhere to whatever conventions are adopted by your team. If you don't, you will infuriate your colleagues and become a pariah.

Here at SPICED, we have some established stylistic standards that you should use.

### Indentation and Line Breaks

As a general rule, an opening curly brace (`{`) should be immediately followed by a line break. The matching closing curly brace (`}`) should appear on its own line and in the same column as the first character of the line in which the opening curly brace appeared.

```js
if (true) {
}
```

```js
for (var i = 0; i < 5; i++) {}
```

```js
function fn() {}
```

There are a few exceptions to this. The one we will encounter most frequently at this stage is empty object literals. It is better not to do a line break between the curly braces for an empty object.

```js
var obj = {};
```

However, object literals that have properties should follow the rule.

```js
var obj = {
    name: 'Leonardo'
};
```

The code contained by curly braces should be indented. This is essential for clarity.

```js
if (true) {
    console.log('hello!');
}
```

```js
for (var i = 0; i < 10; i++) {
    if (i > 5) {
        console.log(i - 5);
    } else {
        console.log(i);
    }
}
```

```js
function createActor(name, age, oscars) {
    return {
        name: name,
        age: age,
        oscars: oscars,
        hello: hello,
        hasMoreOscarsThan: hasMoreOscarsThan
    };

    function hello() {
        console.log('Hello, my name is ' + this.name);
    }

    function hasMoreOscarsThan(actor) {
        return this.oscars > actor.oscars;
    }
}
```

To see why indentation is so important, take a look at the previous example with the indentation removed:

```js
// 🚫🚫🚫 Don't do this! Always indent your code!
function createActor(name, age, oscars) {
    return {
        name: name,
        age: age,
        oscars: oscars,
        hello: hello,
        hasMoreOscarsThan: hasMoreOscarsThan
    };

    function hello() {
        console.log('Hello, my name is ' + this.name);
    }

    function hasMoreOscarsThan(actor) {
        return this.oscars > actor.oscars;
    }
}
```

As you can see, it is very difficult to discern the structure of this code. The fact that `hello` is contained by `createActor` is easy to miss.

It is important for closing curly braces that end blocks (such as `if`, `for` and `while`) and function declarations to appear by themselves on a line so that the ends of the blocks and functions that they terminate are clearly demarcated.

```js
if (somethingOrOther) {
    console.log('yes!');
}
if (somethingElse) {
    console.log('ok!');
}
```

However, we make exceptions for `else` and other blocks that are closely associated with the previous block and are part of the same structure as them.

```js
if (somethingOrOther) {
    console.log('yes!');
} else {
    console.log('no!');
}
```

Apart from blocks and function declarations, there are other structures that use curly braces and the situations they are used in may demand that their closing curly braces not appear on their line alone.

Semicolons are used to mark the end of statements. Some statements (`if`, `else`, `for`, and `while` blocks as well as function declarations) are not supposed to have their ending marked with a semicolon but most are and of those some end with closing curly braces.

```js
var obj = {
    name: 'Leonardo',
    age: 42
};
```

```js
var fn = function(val) {
    console.log(val);
};
```

When structures that use curly braces are contained by parentheses, we do not put any whitespace between the curly braces and the parentheses.

```js
leo.hasMoreOscarsThan({
    name: 'Meryl',
    oscars: 3
});
```

Object literals and function expressions, both of which use curly braces, frequently appear in lists of function arguments and in arrays. In such cases closing curly braces will be followed by commas and square brackets.

```js
setTimeout(function() {
    console.log('Hello!');
}, 1000);
```

```js
var actors = [
    {
        name: 'Jennifer Lawrence',
        age: 27
    },
    {
        name: 'Meryl Streep',
        age: 68
    }
];
```

### Prettier

[Prettier](https://prettier.io/) is a code formatter that, for the most part, shares SPICED's opinions about how code should be formatted. The Atom integration, which you should install, can be configured to automatically format your code every time you save a file.

1. In Atom, go to Settings > Packages > Install (Windows) or Preferences > Packages > Install (MacOS). Search for the "prettier-atom" package and install it.

2. After installation, find Prettier in the Packages menu and select the "Toggle Format on Save" option.

### Exercise

Paste the poorly formatted code below into a file and add line breaks and indentation to make it readable.

```js
function fizzbuzz() { for (var i = 1; i <= 100; i++) { if (i % 3 == 0) {
if (i % 5 == 0) { console.log('fizzbuzz'); } else { console.log('fizz'); } } else {
if (i % 5 == 0) { console.log('buzz'); } else { console.log(i);}}}}
```
