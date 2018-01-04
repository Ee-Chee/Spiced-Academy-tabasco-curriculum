# Node + Postgres

The <a href="https://github.com/brianc/node-postgres">node-postgres</a> module allows you to query a PostgreSQL database from Node. 

To make a query you need a client, an object that can connect to and talk to your database. The most direct way to do this is to call the `Client` constructor that the `pg` module exposes, passing a string with the details required to make the connection. You then call the `connect` method of the client to connect to the database. Once you have a connected client, you call its `query` method, passing it the query as a string and a callback.

```js
var pg = require('pg');

var client = new pg.Client('postgres://spicedling:password@localhost:5432/cities');

client.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        client.query('SELECT * FROM cities', function(err, results) {
	    console.log(results.rows);
	    client.end();
        });
    }
});
```

Unfortunately, this straightforward way of making database connections can quickly become problematic. The issue is that Postgres can only handle a limited number of connections at one time. If you are creating a new connection for every query, it would be easy to exceed this limit if your site gets a sudden burst of traffic.

The solution is to have a finite set of connections that remain open and to distribute queries among them. This is called *connection pooling* and the `pg` module has a built in mechanism for doing it.

Implementing connection pooling with `pg` is relatively simple. You call the `Pool` constructor that the module exposes, passing to it an object with configuration information for the connections it will make.

```js
var dbUrl = 'postgres://spicedling:password@localhost:5432/cities';

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

```

Since the `Pool` instance may emit an error event, it is necessary to add an error event listener to it.

Once you have a pool instance, you call the `connect` method of it to receive a `client` that you can use to perform a query.

```js
pool.connect(function(err, client, done) {
    if (!err) {
        client.query('SELECT * FROM cities', function(err, data) {
            if (!err) {
                console.log(data);
            }
            done();
        });
    }
});
```

In addition to a `client`, the callback you pass to `connect` will be a passed a `done` function which you call when you are done using the connection.

## Important note about preventing SQL injection

If untrusted strings, such as input from users, must be used to construct your query, it is important that you do not build the string yourself but let `pg` do it for you.

```js
function getCity(cityName) {
    var query = 'SELECT * FROM cities WHERE name = $1';

    client.query(query, [cityName], function(err, results) {
        if (!err) {
	    console.log(results.rows);
        }
    });
}
```

In the example above, `pg` replaces the `$1` with an escaped `cityName`, preventing any mischief.

![xkcd cartoon on SQL injection](http://imgs.xkcd.com/comics/exploits_of_a_mom.png)

## Exercises

Get started on the <a href="../wk7_petition">Petition project</a>.
