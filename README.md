[![Build Status](https://travis-ci.org/biggora/connect-caminte.png?branch=master)](https://travis-ci.org/biggora/connect-caminte)
[![Dependency Status](https://gemnasium.com/biggora/connect-caminte.png)](https://gemnasium.com/biggora/connect-caminte)
[![NPM version](https://badge.fury.io/js/connect-caminte.png)](http://badge.fury.io/js/connect-caminte)
# CrossDB Session Storage for [Connect](http://www.senchalabs.org/connect/)

connect-caminte is a Cross DataBase session store for [Connect](http://www.senchalabs.org/connect/) backed by [CaminteJS](http://www.camintejs.com/)

## Supported Databases

<table>
    <tr>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/memory.png"/></td>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/mongodb.png"/></td>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/mysql.png"/></td>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/postgresql.png"/></td>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/sqlite.png"/></td>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/mariadb.png"/></td>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/firebird.png"/></td>    
    </tr>
    <tr>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/couchdb.png"/></td>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/rethinkdb.png"/></td>
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/redis.png"/></td>  
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/tingodb.png"/></td> 
      <td><img width="100" src="https://github.com/biggora/connect-caminte/raw/master/media/neo4j.png"/></td> 
      <td colspan="2"></td>
    </tr>
</table>

## Installation

Installation is done using the Node Package Manager (npm). If you don't have npm installed on your system you can download it from [npmjs.org](http://npmjs.org/)
To install connect-caminte:

    $ npm install -g connect-caminte

## Usage overview (for Express 3)

```js
var express = require('express'),
CaminteStore = require('connect-caminte')(express),
app = express();

app.use(express.cookieParser());
app.use(express.session({
    cookie: {
        maxAge: 60000 // 1 min as example
    },
    secret: "Wild CaminteJS",
    store: new CaminteStore({
                                driver: 'sqlite3',
                                collection: 'mysession',
                                db: {
                                     database: "./db/data.db"
                                },
                                maxAge: 300000, // 3 min
                                clear_interval: 60 // 1 min
                            })
}));

app.get('/', function(req, res){
 var sess = req.session;
      if (sess.views) {
        res.send('<p>views: ' + sess.views + '</p>'
         + '<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
        sess.views++;
      } else {
        sess.views = 1;
        res.send('welcome to the session demo. refresh!');
      }
});

app.listen(3000);
```

## Usage overview (for Express 4)

```js
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var CaminteStore = require('connect-caminte')(session);
var app = express();

app.use(cookieParser());
app.use(session({
    cookie: {
        maxAge: 60000 // 1 min as example
    },
    secret: "Wild CaminteJS",
    store: new CaminteStore({
                                driver: 'sqlite3',
                                collection: 'mysession',
                                db: {
                                     database: "./db/data.db"
                                },
                                maxAge: 300000, // 3 min
                                clear_interval: 60 // 1 min
                            })
}));

app.get('/', function(req, res){
 var sess = req.session;
      if (sess.views) {
        res.send('<p>views: ' + sess.views + '</p>'
         + '<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
        sess.views++;
      } else {
        sess.views = 1;
        res.send('welcome to the session demo. refresh!');
      }
});

app.listen(3000);
```

## Options
  * `driver` Database driver name
  * `collection` Store collection to host sessions. 'session' by default.
  * `clear_interval` sec. to check expired sessions to remove on db
  * `db`
     *  `host` server host
     *  `port` server port
     *  `database` database name (path to file for sqlite)
     *  `username` database user
     *  `password` database user password


## In the Wild

The following projects use connect-caminte.

If you are using connect-caminte in a project, app, or module, get on the list below
by getting in touch or submitting a pull request with changes to the README.

### Startups & Apps

- [TViMama](http://tvimama.com/)
- [GorkaTV](https://gorkatv.com/)


### Recommend extensions

- [Bootstrap Fancy File Plugin](http://biggora.github.io/bootstrap-fancyfile/)
- [Bootstrap Ajax Typeahead Plugin](https://github.com/biggora/bootstrap-ajax-typeahead)
- [TrinteJS - Javascrpt MVC Framework for Node.JS](http://www.trintejs.com/)
- [CaminteJS - Cross-db ORM for NodeJS](http://www.camintejs.com/)
- [Middleware exposing user-agent for NodeJS](https://github.com/biggora/express-useragent)
- [2CO NodeJS adapter for 2checkout API payment gateway](https://github.com/biggora/2co)

## Author

Aleksej Gordejev (aleksej@gordejev.lv).


## License

(The MIT License)

Copyright (c) 2012 Aleksej Gordejev <aleksej@gordejev.lv>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Resources

- Visit the [author website](http://www.gordejev.lv).
- Follow [@biggora](https://twitter.com/#!/biggora) on Twitter for updates.
- Report issues on the [github issues](https://github.com/biggora/connect-caminte/issues) page.

[![Analytics](https://ga-beacon.appspot.com/UA-22788134-5/connect-caminte/readme)](https://github.com/igrigorik/ga-beacon)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/biggora/connect-caminte/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

