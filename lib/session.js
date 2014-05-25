/**
 *
 *  @revision    $Id: session.js 2013-10-08 04:54:16 Aleksey $
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
 */

/**
 *  Define Session Model
 *  @param {Object} schema
 *  @param {Object} options
 **/
module.exports = function (schema, options) {
    var collection = typeof options.collection === 'undefined' ? '' : options.collection;
    var Session = schema.define(collection, {
        sid: {type: String, index: true, unique: true},
        session_data: {type: schema.JSON},
        expires: {type: Date, index: true},
        expireAfterSeconds: {type: Number, index: true},
        ip: {type: String, 'default': 'localhost'},
        loggedIn: {type: Number, index: true, 'default': 0},
        user: {type: String, index: true, 'default': 'guest'}
    });
    return Session;
};