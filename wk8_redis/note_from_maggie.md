Deploying to Heroku with Redis advice:  Make sure you have cookie parser running before express session.  Also, the value you pass to the Store constructor & what you pass to the createClient method needs to be different for it to work on redis

### `createClient`

```js
const client = redis.createClient(process.env.REDIS_URL || {host:'localhost', port: 6379});
```

### Session Store

```js
var store = {};
if(process.env.REDIS_URL){
   store = {
       url: process.env.REDIS_URL
   };
} else {
   store = {
       ttl: 3600, //time to live
       host: host,
       port: 6379
   };
}

app.use(cookieParser());
app.use(session({
   store: new Store(store),
   resave: true,
   saveUninitialized: true,
   secret: secret
}));
```
