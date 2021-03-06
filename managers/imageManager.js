/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
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

var manager = require("./manager");

var db;
var cache;

exports.init = function (database, c) {
    db = database;
    cache = c;
};


exports.addImage = function (json, callback) {
    var returnVal = {
        success: false,
        id: null,
        clientId: null,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk && json.name) {
        json.name = json.name.replace(/ /g, "");
        db.addImage(json, function (result) {
            if (result && result.success) {
                returnVal.success = result.success;
                returnVal.id = result.id;
                returnVal.clientId = result.clientId;
                callback(returnVal);
            } else {
                returnVal.message = result.message;
                callback(returnVal);
            }
        });
    } else {
        callback(returnVal);
    }
};


exports.updateImage = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        //console.log("update req in manager: " + JSON.stringify(json));
        if (json.id !== undefined && json.id !== null &&
                json.clientId !== undefined && json.clientId !== null &&
                json.name) {
            json.name = json.name.replace(/ /g, "");
            db.updateImage(json, function (result) {
                if (result && result.success) {
                    returnVal.success = result.success;
                    callback(returnVal);
                } else {
                    returnVal.message = "Error updating";
                    callback(returnVal);
                }
            });
        } else {
            returnVal.message = "Missing parameters";
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};


exports.getImage = function (id, clientId, callback) {
    var idOk = manager.securityCheck(id);
    var clientIdOk = manager.securityCheck(clientId);
    if (idOk && clientIdOk) {
        var cacheKey = clientId + ":" + id;
        cache.get(cacheKey, function (err, value) {
            if (!err) {
                if (value === undefined) {
                    db.getImage(id, clientId, function (result) {
                        if (result && result.fileData) {
                            cache.set(cacheKey, result, function (err, success) {
                                if (!err && success) {
                                    //console.log("got from DB");
                                    callback(result.fileData, result.fileExtension);
                                } else {
                                    callback(null, null);
                                }
                            });
                        } else {
                            callback(null, null);
                        }
                    });
                } else {
                    //console.log("found in cache");
                    //console.log(value);
                    callback(value.fileData, value.fileExtension);
                }
            } else {
                callback(null, null);
            }
        });

    } else {
        callback(null, null);
    }
};


exports.getImageDetails = function (id, clientId, callback) {
    var idOk = manager.securityCheck(id);
    var clientIdOk = manager.securityCheck(clientId);
    if (idOk && clientIdOk) {
        db.getImageDetails(id, clientId, function (result) {
            if (result && result.id > 0) {
                callback(result);
            } else {
                callback({});
            }
        });
    } else {
        callback({});
    }
};


exports.getPageCount = function (clientId, callback) {
    var clientIdOk = manager.securityCheck(clientId);
    if (clientIdOk) {
        db.getPageCount(clientId, function (result) {
            if (result) {
                callback(result);
            } else {
                callback({});
            }
        });
    } else {
        callback({});
    }
};

exports.getImageByClient = function (clientId, page, callback) {
    var clientIdOk = manager.securityCheck(clientId);
    var pageIdOk = manager.securityCheck(page);
    if (clientIdOk && pageIdOk) {
        db.getImageByClient(clientId, page, callback);
    } else {
        callback([]);
    }

};


exports.deleteImage = function (id, clientId, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var idOk = manager.securityCheck(id);
    var clientIdOk = manager.securityCheck(clientId);
    if (idOk && clientIdOk) {
        db.deleteImage(id, clientId, function (result) {
            if (result && result.success) {
                var cacheKey = clientId + ":" + id;
                cache.del(cacheKey, function (err, count) { 
                    //console.log("delete form memory err: " + err);
                    //console.log("count deleted form memory: " + count);
                    returnVal.success = result.success;
                    callback(returnVal);                    
                });
            } else {
                returnVal.message = "Error deleting";
                callback(returnVal);
            }
        });
    } else {
        callback({});
    }
};
