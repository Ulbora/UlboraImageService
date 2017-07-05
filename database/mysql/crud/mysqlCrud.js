/*     
 Copyright (C) 2016 Ulbora Labs Inc. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var mysql = require('mysql');
var pool;
exports.connect = function (host, user, pw, db, cpnum) {
    pool = mysql.createPool({
        connectionLimit: cpnum,
        host: host,
        user: user,
        password: pw,
        database: db
    });
};
exports.testConnection = function (callback) {
    var rtn = false;
    pool.getConnection(function (err, connection) {
        if (!err && connection) {
            connection.release();
            rtn = true;
        }
        callback(rtn);
    });
};

exports.getConnection = function (callback) {
    pool.getConnection(function (err, connection) {
        if(err){
            console.error("Database Insert error: " + JSON.stringify(err));
        }
        callback(err, connection);
    });
};

exports.insert = function (con, query, args, callback) {
    var rtn = {
        id: -1,
        success: false,
        message: ""
    };
    var c;
    if (con) {
        c = con;
    } else {
        c = pool;
    }
    c.query(query, args, function (err, result) {
        console.log("result in mysqlCrud: " + JSON.stringify(result));
        if (!err && result.insertId) {
            rtn.id = result.insertId;
            rtn.success = true;
            callback(rtn);
        } else {
            console.error("Database Insert error: " + JSON.stringify(err));
            rtn.message = "Database Insert failed.";
            callback(rtn);
        }
    });
};

exports.insertNoId = function (con, query, args, callback) {
    var rtn = {
        success: false,
        message: ""
    };
    var c;
    if (con) {
        c = con;
    } else {
        c = pool;
    }
    c.query(query, args, function (err, result) {
        console.log("result in mysqlCrud: " + JSON.stringify(result));
        if (!err) {
            rtn.success = true;
            callback(rtn);
        } else {
            console.error("Database Insert error: " + JSON.stringify(err));
            rtn.message = "Database Insert failed.";
            callback(rtn);
        }
    });
};

exports.get = function (query, args, callback) {
    var rtn = {
        success: false,
        message: "",
        data: null
    };
    pool.query(query, args, function (err, result) {
        if (!err && result) {
            //console.log("found data: " + JSON.stringify(result));
            rtn.success = true;
            rtn.data = result;
            callback(rtn);
        } else {
            console.error("Database get error: " + JSON.stringify(err));
            rtn.message = "Database get failed";
            callback(rtn);
        }
    });
};

exports.getList = function (query, callback) {
    var rtn = {
        success: false,
        message: "",
        data: null
    };
    pool.query(query, function (err, result) {
        if (!err && result) {
            console.log("found data list: " + JSON.stringify(result));
            rtn.success = true;
            rtn.data = result;
            callback(rtn);
        } else {
            console.error("Database getList error: " + JSON.stringify(err));
            rtn.message = "Database getList failed";
            callback(rtn);
        }
    });
};

exports.update = function (con, query, args, callback) {
    var rtn = {
        success: false,
        message: ""
    };
    var c;
    if (con) {
        c = con;
    } else {
        c = pool;
    }    
    c.query(query, args, function (err, result) {        
        if (!err && result.affectedRows && result.affectedRows > 0) {
            rtn.success = true;
            callback(rtn);
        } else {
            console.error("Database update error: " + JSON.stringify(err));
            rtn.message = "Dababase update failed.";
            callback(rtn);
        }
    });
};


exports.delete = function (con, query, args, callback) {
    var rtn = {
        success: false,
        message: ""
    };
    var c;
    if (con) {
        c = con;
    } else {
        c = pool;
    }
    console.log("deleted rows: " + query);
    console.log("deleted rows args: " + JSON.stringify(args));
    c.query(query, args, function (err, result) {
        if (!err && result) {
            console.log("deleted rows: " + JSON.stringify(result));
            rtn.success = true;
            callback(rtn);
        } else {
            console.error("Database delete error: " + JSON.stringify(err));
            rtn.message = "Dababase delete failed.";
            callback(rtn);
        }
    });
};







