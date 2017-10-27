# `Object.assign`

`Object.assign` is a new way to add properties to an object. This function accepts one or more objects as arguments. It adds to the first object passed to it all the properties of all the other objects passed to it in order. It then returns the the first argument that was passed to it.

```js
const leo = {
    name: 'Leonardo DiCaprio'
};

Object.assign(leo, {
    age: 42,
    oscars: 1
});

console.log(leo.name, leo.age, leo.oscars); // logs "Leonardo DiCaprio 42 1"

const jlaw = Object.assign({
    name: 'Jennifer Lawrence'
}, {
    age: 26,
    oscars: 1
}, {
    hello: function() {
        console.log(`Hello, I am ${this.name} and I am ${this.age} years old.`)
    }
});

jlaw.hello(); // logs "Hello, I am Jennifer Lawrence and I am 26 years old."
```

It is very common to pass an empty object as the first argument to `Object.assign` in order create a _clone_ of the object passed as the second argument. You can then modify the copy without affecting the original.

```js
const leo = {
    name: 'Leonardo DiCaprio',
    age: 42,
    oscars: 1
};

const pcruz = Object.assign({}, leo);

pcruz.name = 'Penélope Cruz';

console.log(pcruz.name, pcruz.age, pcruz.oscars); // logs "Penélope Cruz 42 1"

console.log(leo.name, leo.age, leo.oscars); // logs "Leonardo DiCaprio 42 1"
```

When you do this, be aware that `Object.assign` only does _shallow_ cloning. If any of the properties of the object being copied are objects or arrays, those objects or arrays will not be cloned.

```js
const leo = {
    name: 'Leonardo DiCaprio',
    age: 42,
    oscars: 1,
    movies: [ 'Titanic', 'Django Unchained' ]
};

const pcruz = Object.assign({}, leo, { name: 'Penélope Cruz' });

pcruz.movies[0] = 'Vicky Cristina Barcelona';

console.log(pcruz.movies); //logs [ 'Vicky Cristina Barcelona', 'Django Unchained' ]

console.log(leo.movies); //logs [ 'Vicky Cristina Barcelona', 'Django Unchained' ]
```


`Object.assign` only copies enumerable properties that belong directly to an object and are not inherited from a prototype.

```js
function Rectangle(w, h) {
    this.width = w;
    this.height = h;
}

Rectangle.prototype.getArea = function() {
    return this.width * this.height;
};

const rect = new Rectangle(4, 5);

rect.width * rect.height; // 20

rect.getArea(); // 20

const copy = Object.assign({}, rect);

copy.width * copy.height; // 20

copy.getArea(); // TypeError: rect.getArea is not a function
```
