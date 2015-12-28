/**
 *
 *  @revision    $Id: test.js 2013-10-08 04:54:16 Aleksey $
 *  @created     2013-10-08 04:54:16
 *  @category    Express Helpers
 *  @package     connect-caminte
 *  @version     0.0.4
 *  @copyright   Copyright (c) 2009-2013 - All rights reserved.
 *  @license     MIT License
 *  @author      Alexey Gordeyev IK <aleksej@gordejev.lv>
 *  @link        http://www.gordejev.lv/
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 */
var driver = process.env.CAMINTE_DRIVER || 'memory';
var should = require('should');
var fs = require('fs');
var database = require('./database');
var ExpressSession = require('express-session');
var CaminteStore = require("./../lib/connect-caminte");
var SessionStore = CaminteStore(ExpressSession);
var sid = 'XXXr4djvbu7ubi8708uyuby' + new Date().getTime();
var maxAge = 300000; // 3 min
var db = database[driver];
var dbDir = './db'; // for sqlite

/* create dir for sqlite */
var dstat, tstat;
try {
    dstat = fs.statSync(dbDir);
} catch (err) {
    console.log(err);
}
if (!dstat) {
    fs.mkdirSync(dbDir, '0755');
}
try {
    tstat = fs.statSync(dbDir + '/test');
} catch (err) {
    console.log(err);
}
if (!tstat) {
    fs.mkdirSync(dbDir + '/test', '0755');
}

/**
 * Simple tests for the Session store
 */
describe(driver + ' - Session store:', function () {
    'use strict';
    var store;

    before(function (done) {
        store = new SessionStore({
            driver: driver,
            collection: 'session',
            db: db,
            clear_interval: 60, // 1 min
            secret: "feb722690aeccfa92ca9ee6fdf06e55a",
            maxAge: maxAge
        }, function () {
            done();
        });
    });


    after(function (done) {
        // User.destroynpm installAll(done);
        done();
    });


    it('Create and store session', function (done) {
        store.set(sid, {
            cookie: {ssid: sid, maxAge: maxAge}
        }, function (err, session) {
            should.equal(err, null);
            session.should.be.have.property('sid');
            should.equal(session.sid, sid);
            should.equal(session.session_data.cookie.ssid, sid);
            should.equal(session.session_data.cookie.maxAge, maxAge);
            should.equal(session.expireAfterSeconds, maxAge / 1000);
            should.equal(session.ip, 'localhost');
            should.equal(session.user, 'guest');
            should.equal(session.loggedIn, 0);
            done();
        });
    });

    it('Find stored session', function (done) {
        store.get(sid, function (err, session) {
            should.equal(err, null);
            should.equal(session.cookie.ssid, sid);
            done();
        });
    });

    it('Count sessions', function (done) {
        store.length(function (err, count) {
            should.equal(err, null);
            should.equal(typeof count, 'number');
            should.equal(count, 1);
            done();
        });
    });

    it('Select all sessions', function (done) {
        store.all(function (err, sessions) {
            should.equal(err, null);
            should.equal(sessions.length, 1);
            done();
        });
    });

    it('Destroy session', function (done) {
        store.destroy(sid, function (err) {
            should.equal(err, null);
            store.get(sid, function (err, session) {
                should.equal(err, null);
                should.equal(session, null);
                done();
            });
        });
    });

});
