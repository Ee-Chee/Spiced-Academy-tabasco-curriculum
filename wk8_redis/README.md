# Caching

Caching is a strategy developers use to make their applications perform better. If a database query or call to an external API takes a long time, but you know that the result you get back will remain valid for a while, why not keep the result around and reuse it next time? This speeds things up and has the added benefits of reducing network traffic, decreasing load on your database, and making it less likely that you will hit rate limits on third-party APIs. It's a good idea but with it comes some challenges. You have to put this stuff somewhere, be able to get it quickly, and know when it is no longer valid.

# Redis

<a href="http://redis.io">Redis</a> is a <a href="https://en.wikipedia.org/wiki/NoSQL">NoSQL</a> database that has many uses. It keeps all its data in memory, which helps to make it very fast, but this also means that it is not a great place to put data you want to keep forever. The stuff we want to cache is stuff we want quick access to but not stuff we want to keep forever so it makes sense to use Redis as our cache.

## Installation
The following installation instructions are for users of macOS and Windows Subsystem for Linux. Windows users who do not run WSL are out of luck. There is no Windows version of Redis. However, there is a <a href="https://github.com/MSOpenTech/redis">Windows port</a> of Redis you can try. Alternatively, you can talk to your friendly neighborhood SPICED instructor about using a Redis installation on a different machine.

1. Open Bash and `cd` into the directory in which you would like to keep Redis

2. Mac users should enter
    ```
    curl http://download.redis.io/releases/redis-4.0.11.tar.gz -o redis-4.0.11.tar.gz
    ```
    While Ubuntu users should enter
    ```
    wget http://download.redis.io/releases/redis-4.0.11.tar.gz
    ```
    This will download the compressed file.
3. To decompress, enter the following:
    ```
    tar xzf redis-4.0.11.tar.gz
    ```
4. Move into the decompressed directory
    ```
    cd redis-4.0.11
    ```
5. Start compilation by entering
    ```
    make
    ```
6. When the compilation is complete, print the working directory and copy it into to your clipboard
    ```
    pwd
    ```
7. Mac users should open .bash_profile in nano
    ```
    nano ~/.bash_profile
    ```
    While Ubuntu users should open .bashrc
    ```
    nano ~/.bashrc
    ```
8. Add the following line to the file. Be sure to replace the placeholder path with the one in your clipboard and add /src to the end
    ```
    PATH=$PATH:/THE/PATH/YOU/COPIED/EARLIER/src
    ```
9. Hit ctrl + x to save the file and exit nano.
10. Mac users should enter
    ```
    source .bash_profile
    ```
    While Ubuntu users should enter
    ```
    source .bashrc
    ```
    This causes Bash to re-run the file you just edited
    
You can now start Redis by typing the following:


```
redis-server --daemonize yes
```

You can then run the command line interface to start messing around with Redis.

```
redis-cli
```

## Basic commands

Redis is a key-value database. That is, you store and access values with keys that you specify.

```
> SET city berlin
OK
>
> GET city
"berlin"
```

In the example above the `city` key was set without an expiration, which means that it will be around indefinitely. You can use the <a href="http://redis.io/commands/expire">`EXPIRE`</a> command to give a key a specific expiration. You can also set the expiration and the value of the key at the same time by using the `SETEX` command.

```
> SETEX country 60 germany
ok
```

In the example above the `country` key will disappear after sixty seconds.

To manually remove a key, use the `DEL` command.

```
> DEL city
(integer) 1
```

The `(integer) 1` tells you that one key was deleted.

## Redis + Node

To use Redis in your Node project, you should install the <a href="https://github.com/NodeRedis/node_redis">node_redis</a> module.

```
npm install redis --save
```

In your project, after requiring the module, you should create a client and pass to it the details it needs to make a connection.

```js
var redis = require('redis');
var client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('error', function(err) {
    console.log(err);
});
```

From there you can use the client to send commands.

```js
client.setex('city', 60, 'berlin', function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log('the "city" key was successfully set');

    client.get('city', function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log('The value of the "city" key is ' + data);
    })
});
```

If you call `get` with a key that does not exist, the value you get back will be `null`. We call this a _cache miss_, whereas successfully getting a key is a _cache hit_.

Note that if you have an object that you want to store in Redis, you should call `JSON.stringify` on it and use the resulting string in your call to `SET` or `SETEX`. When you `GET` such values you should call `JSON.parse` on them.

## Exercise

Modify your <a href="../wk7_petition">petition project</a> so that before doing your query to get the list of people who have signed the petition you check Redis to see if you have the rows cached. If you don't have them in the cache you should do the query and then store the rows in Redis. Then modify your code that inserts data into the `signatures` and `user_profiles` tables so that the rows stored in Redis are deleted after the insertions, since the data is now stale.

**_Please create a new branch to contain all of your work with Redis_.**
```
git checkout -b discoduck_redis origin/discoduck 
```
