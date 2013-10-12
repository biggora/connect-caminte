/**
 *
 *  @revision    $Id: test.js 2013-10-08 04:54:16 Aleksey $
 *  @created     2013-10-08 04:54:16
 *  @category    Express Helpers
 *  @package     express-caminte
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

var express = require('express'),
        CaminteStore = require("./../lib/connect-caminte")(express),
        app = express();


app.use(express.cookieParser());
app.use(express.session({
    cookie: {
        maxAge: 180000, // 3 min
        secret: "feb722690aeccfa92ca9ee6fdf06e55a",
    },
    secret: "Wild Express-CaminteJS",
    store: new CaminteStore({
        driver: 'sqlite3',
        collection: 'session',
        db: {
        //    host: "127.0.0.1",
        //    port: "27017",
        //    username: "test",
        //    password: "2NDcVLWCTxhfXa9CA",
            database: "./db/session.db"
        },
        clear_interval: 60, // 1 min
        secret: "feb722690aeccfa92ca9ee6fdf06e55a",
        maxAge: 300000 // 3 min
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