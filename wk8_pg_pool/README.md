# PG Pool

Up to now we've been creating a new database connection for every query we make. This has been fine for our development purposes but it is not great for a production environment. For one thing, it takes time to open each connection. Another problem is that we have no control over how many connections can be open at any one time. When our site becomes popular we could quite easily create too many connections for our database to handle.

The solution is to have a finite set of connections that remain open and to distribute queries among them. This is called _connection pooling_ and the `pg` module has a built in mechanism for doing it.

Implementing connection pooling is quite simple. Assuming that our module for making database queries looks like this:

```js
var pg = require('pg');
var dbUrl = 'postgres://spicedling:password@localhost:5432/petition';

exports.query = function(query, params) {
    var client = new pg.Client(dbUrl);
    return new Promise(function(resolve, reject) {
        client.connect(function(err) {
            if (err) {
                reject(err);
                return;
            }
            client.query(query, params, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
                client.end();
            })
        })
    });
};
```
We just need to change it to look like this:

```js
var dbUrl = 'postgres://spicedling:password@localhost:5432/comicbookcharacters';

dbUrl = require('url').parse(dbUrl);

var dbUser = dbUrl.auth.split(':');

var dbConfig = {
    user: dbUser[0],
    database: dbUrl.pathname.slice(1),
    password: dbUser[1],
    host: dbUrl.hostname,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

var pool = new pg.Pool(dbConfig);

pool.on('error', function(err) {
    console.log(err);
});

exports.query = function(str, params) {
    return new Promise(function(resolve, reject) {
        pool.connect(function(err, client, done) {
            if (err) {
                reject(err);
                return;
            }
            client.query(str, params || [], function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
                done();
            });
        });
    })
};
```

The changes may be summarized thus:

* The database url is parsed to populate a configuration object with values from it.

* A single `Pool` instance is created with the configuration object.

* Since the `Pool` instance may emit an error event, an error event listener is added to it.

* Rather than creating a new `Client` instance in the `query` function, the `connect` method of the `Pool` instance is called and a client from the pool is passed to the callback and used to make the query.

* After performing a query, `end` is not called on the `Client` instance. Rather, the `done` function passed to `connect`'s callback is called to return the client back to the pool.
