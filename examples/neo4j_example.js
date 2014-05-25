/**
 *
 *  @revision    $Id: riak_example.js 2013-10-08 04:54:16 Aleksey $
 *  @created     2013-10-08 04:54:16
 *  @category    Express Helpers
 *  @package     connect-caminte
 *  @version     0.0.1
 *  @copyright   Copyright (c) 2009-2013 - All rights reserved.
 *  @license     MIT License
 *  @author      Alexey Gordeyev IK <aleksej@gordejev.lv>
 *  @link        http://www.gordejev.lv/
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 */

var express = require('express');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var CaminteStore = require("./../lib/connect-caminte");
var app = express();
var secret = "feb722690aeccfa92ca9ee6fdf06e55a";
var maxAge = 300000;

var sessionStore = CaminteStore(expressSession);

app.use(cookieParser());
app.use(expressSession({
    cookie: {
        maxAge: maxAge, // 3 min
        secret: secret
    },
    secret: "Wild CaminteJS",
    store: new sessionStore({
        driver: 'neo4j',
        collection: 'session',
        db: {
            host: "192.168.56.101",
            port: "7474"
        },
        clear_interval: 60, // 1 min
        secret: secret,
        maxAge: maxAge 
    })
}));

app.get('/', function(req, res, next) {
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

app.listen(3500);
