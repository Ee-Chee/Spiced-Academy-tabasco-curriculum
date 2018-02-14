# socket.io

[socket.io](https://socket.io) is a Javascript library that enables real-time, two-way communication between clients and servers using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). The library hides most of the details of establishing connections from users. Once connections are established, it is pretty easy to make the server send messages to clients and vice versa.

Using socket.io requires some integration on both the server side and the client side.

## Server

First, the package needs to be installed.

```
npm install socket.io --save
```

In your express project, you create and add routes to your app as you normally would. However, you must also must wrap your app in an `http.Server` instance that you can pass to socket.io. It is this server that should listen for requests.

```js
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });

app.get('/', function(req, res) { // just a normal route
    res.sendStatus(200);
});

server.listen(8080); // it's server, not app, that does the listening
```

With your server now set up, you can start handling connections and sending messages.

```js
io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    socket.on('thanks', function(data) {
        console.log(data);
    });

    socket.emit('welcome', {
        message: 'Welome. It is nice to see you'
    });
});
```

If you want to send a message to all connected sockets, you can use the `emit` method of the `sockets` object attached to `io`.

```js
io.sockets.emit('achtung', {
    warning: 'This site will go offline for maintenance in one hour.'
});
```

This `sockets` object has a property named `sockets` which is an object whose keys are the ids of the connected sockets and whose values are the connected sockets themselves. You can use this to send messages to specific sockets.

```js
io.sockets.sockets[recipientSocketId].emit('request', {
    message: 'You have a new friend request!'
});
```

If you'd like to send a message to every socket _except_ a particular one, you could use the one you do not want to receive the message to do it by using its `broadcast` property.

```js
io.sockets.sockets[recipientSocketId].broadcast.emit('brag', {
    message: 'Hey everybody, I just received a new friend request!'
});
```

## Client

The server will serve the client library from the url `/socket.io/socket.io.js` so you could add to your html the following `<script>` tag.

```HTML
<script src="/socket.io/socket.io.js"></script>
```

But if you are using babel and webpack to compile and bundle your Javascript, you can import the library.

```js
import * as io from 'socket.io-client';
```

After you have the `io` object, you can connect and start sending and receiving messages.

```js
const socket = io.connect();

socket.on('welcome', function(data) {
    console.log(data);
    socket.emit('thanks', {
      	message: 'Thank you. It is great to be here.'
    });
});
```

