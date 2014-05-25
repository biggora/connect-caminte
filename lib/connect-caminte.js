/**
 *  Caminte sessions store
 *
 *  @revision    $Id: express-caminte.js 2013-10-08 04:54:16 Aleksey $
 *  @created     2013-10-08 04:54:16
 *  @category    Express Helpers
 *  @package     connect-caminte
 *  @version     0.0.1-1
 *  @copyright   Copyright (c) 2009-2013 - All rights reserved.
 *  @license     MIT License
 *  @author      Alexey Gordeyev IK <aleksej@gordejev.lv>
 *  @link        http://www.gordejev.lv/
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/**
 * Library version.
 **/

exports.version = '0.0.2';

/**
 * CaminteStore
 *
 * @param {Object} connect
 * @api public
 */
module.exports = function (connect) {
    var Store = connect.Store || connect.session.Store;

    /**
     * Initialize CaminteStore with the given `options`.
     * Calls `callback` when db connection is ready (mainly for testing purposes).
     *
     * @param {Object} options
     * @param {Function} callback
     * @api public
     **/
    function CaminteStore(options, callback) {
        var self = this;
        self.Session = {};
        self.options = options || {driver: 'memory',collection:'session'};

        options.driver = typeof options.driver === 'undefined' ? 'memory' : options.driver;

        try {
            var Schema = require('caminte').Schema,
                schema = new Schema(self.options.driver, options.db);
            self.Session = require('./session')(schema, options);
            if ('function' === typeof schema.autoupdate) {
                schema.autoupdate(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        } catch (err) {
            console.log('new CaminteStore err:', err);
        }

        Store.call(self, options);

        if (options.clear_interval > 0) {
            self.clear_interval = setInterval(function () {
                self.Session.remove({
                    where: {
                        expires: {
                            lt: new Date()
                        }
                    }
                }, function (err) {
                    if (err) {
                        console.log('Clear sessions err: ', err);
                    }
                });
            }, options.clear_interval * 1000, self);
        }
        callback && callback(self.Session);
    }

    /**
     * Inherit from `Store`.
     */
    CaminteStore.prototype.__proto__ = Store.prototype;

    /**
     * Attempt to fetch session by the given `sid`.
     *
     * @param {String} sid
     * @param {Function} callback
     * @api public
     */
    CaminteStore.prototype.get = function (sid, callback) {
        var self = this;
        self.Session.findOne({
            sid: sid,
            expires: {
                gt: new Date()
            }
        }).exec(function (err, founded_session) {
            if (founded_session && founded_session.session_data) {
                var sess = {};
                if (typeof founded_session.session_data === 'string') {
                    sess = JSON.parse(founded_session.session_data);
                } else {
                    sess = founded_session.session_data;
                }
                callback && callback(err, sess);
            } else {
                callback && callback(null, null);
            }
        });
    };

    /**
     * Commit the given `sess` object associated with the given `sid`.
     *
     * @param {String} sid
     * @param {Session} session
     * @param {Function} callback
     * @api public
     */
    CaminteStore.prototype.set = function (sid, session, callback) {
        var self = this, today = new Date();
        try {
            var new_session = {
                sid: sid,
                session_data: session
            };
            if (session && session.cookie) {
                if (session.cookie._expires) {
                    new_session.expires = new Date(session.cookie._expires);
                } else {
                    var sessLifeTime = self.options.maxAge || (1000 * 60 * 60 * 24 * 14);
                    new_session.expires = new Date(today.getTime() + sessLifeTime);
                }
            }
            var eXseconds = new Date(new_session.expires).getTime();
            var cXseconds = today.getTime();
            new_session.expireAfterSeconds = Math.round((eXseconds - cXseconds) / 1000);
            var loggedIn = 0;
            if (session.passport) {
                loggedIn = session.passport.user ? 1 : 0;
            } else if (session.auth) {
                loggedIn = 1;
            } else if (session.loggedIn || session.logedIn) {
                loggedIn = session.loggedIn || session.logedIn;
            }
            new_session.loggedIn = loggedIn || 0;
            new_session.user = (session.user && (session.user || {}).username) ? session.user.username : "guest";
            self.Session.updateOrCreate({
                sid: sid
            }, new_session, function (err, csession) {
                if (err) {
                    callback && callback(err);
                } else {
                    callback && callback(null, csession);
                }
            });
        } catch (err) {
            callback && callback(err);
        }
    };

    /**
     * Destroy the session associated with the given `sid`.
     *
     * @param {String} sid
     * @param {Function} callback
     * @api public
     */
    CaminteStore.prototype.destroy = function (sid, callback) {
        var self = this;
        self.Session.findOne({
            sid: sid
        }).exec(function (err, data) {
            if (err) {
                callback && callback(err);
            } else if (data) {
                data.destroy(function (err) {
                    callback && callback(null, data);
                });
            } else {
                callback && callback(err);
            }
        });
    };

    /**
     * Fetch number of sessions.
     *
     * @param {Function} callback
     * @api public
     */
    CaminteStore.prototype.length = function (callback) {
        var self = this;
        self.Session.count({}, function (err, count) {
            if (err) {
                callback && callback(err);
            } else {
                callback && callback(null, count);
            }
        });
    };

    /**
     * Clear all sessions.
     *
     * @param {Function} callback
     * @api public
     */
    CaminteStore.prototype.clear = function (callback) {
        var self = this;
        self.Session.destroyAll(function () {
            callback && callback();
        });
    };

    /**
     * Select all sessions.
     *
     * @param {Function} callback
     * @api public
     */
    CaminteStore.prototype.all = function (callback) {
        var self = this;
        self.Session.all({}, function (err, sessions) {
            if (err) {
                callback && callback(err);
            } else {
                callback && callback(null, sessions);
            }
        });
    };

    return CaminteStore;
};