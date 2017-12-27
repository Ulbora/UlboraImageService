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

var imageManager = require("../managers/imageManager");
var constants = require("../constants/constants");
var oauth2 = require("ulbora-oauth2");
var validationUrl = process.env.OAUTH2_VALIDATION_URI || constants.OAUTH2_VALIDATION_URI;

var db;

exports.init = function (database) {
    db = database;
    imageManager.init(db);
};


exports.add = function (req, res) {
    if (req.is('application/json')) {
        var me = {
            role: "admin",
            uri: "/ulbora/rs/image/add",
            scope: "write"
        };
        oauth2.authorize(req, res, me, validationUrl, function () {
            var reqBody = req.body; 
            var bodyJson = JSON.stringify(reqBody);
            console.log("req : " + bodyJson);
            reqBody.fileData = new Buffer(reqBody.fileData, 'base64');
            reqBody.clientId = req.header("clientId");
            
            //console.log("image data: " + reqBody.fileData);
            imageManager.addImage(reqBody, function (result) {
                res.send(result);
            });
        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};


exports.update = function (req, res) {
    if (req.is('application/json')) {
        var me = {
            role: "admin",
            uri: "/ulbora/rs/image/update",
            scope: "write"
        };
        oauth2.authorize(req, res, me, validationUrl, function () {
            var reqBody = req.body;
            reqBody.clientId = req.header("clientId");
            var bodyJson = JSON.stringify(reqBody);
            console.log("body: " + bodyJson);
            imageManager.updateImage(reqBody, function (result) {
                res.send(result);
            });

        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};


exports.get = function (req, res) {
    var id = req.params.id;
    var clientId = req.params.clientId;//req.header("clientId");
    if (id !== null && id !== undefined && clientId !== null && clientId !== undefined) {
        imageManager.getImage(id, clientId, function (imageData, ext) {
            console.log("image ext: " + ext);
            if (imageData && ext) {
                res.set('Content-Type', 'image/' + ext);
                res.send(imageData);
            } else if (imageData) {
                res.send(imageData);
            } else {
                res.send({});
            }

        });
    } else {
        res.send({});
    }
};

exports.getDetails = function (req, res) {
    var me = {
        role: "user",
        uri: "/ulbora/rs/image/details",
        scope: "read"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var imageUrl = req.get("Host");
        var id = req.params.id;
        var clientId = req.header("clientId");
        if (id !== null && id !== undefined && clientId !== null && clientId !== undefined) {
            imageManager.getImageDetails(id, clientId, function (result) {
                var imageUrlLink = "http://" + imageUrl + "/image/get/";
                imageUrlLink += (result.id + "/" + result.clientId);
                result.imageUrl = imageUrlLink;
                res.send(result);
            });
        } else {
            res.send({});
        }
    });
};



exports.getPageCount = function (req, res) {
    var me = {
        role: "user",
        uri: "/ulbora/rs/image/page/count",
        scope: "read"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var clientId = req.header("clientId");
        if (clientId !== null && clientId !== undefined) {
            imageManager.getPageCount(clientId, function (result) {
                res.send(result);
            });
        } else {
            res.send({});
        }
    });
};

exports.getImageByClient = function (req, res) {
    var me = {
        role: "user",
        uri: "/ulbora/rs/image/list",
        scope: "read"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var imageUrl = req.get("Host");
        var clientId = req.header("clientId");
        var page = req.params.page;
        if (clientId !== null && clientId !== undefined) {
            imageManager.getImageByClient(clientId, page, function (result) {
                console.log("imageList: " + JSON.stringify(result));
                if (result && result.length > 0) {                    
                    for (var cnt = 0; cnt < result.length; cnt++) {
                        var imageUrlLink = "http://" + imageUrl + "/image/get/";
                        var imgLink = imageUrlLink += (result[cnt].id + "/" + result[cnt].clientId);
                        result[cnt].imageUrl = imgLink;
                    }
                }
                res.send(result);

            });
        } else {
            res.send([]);
        }
    });
};

exports.delete = function (req, res) {
    var me = {
        role: "admin",
        uri: "/ulbora/rs/image/delete",
        scope: "write"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var id = req.params.id;
        var clientId = req.header("clientId");
        if (id !== null && id !== undefined && clientId !== null && clientId !== undefined) {
            imageManager.deleteImage(id, clientId, function (result) {
                res.send(result);
            });
        } else {
            res.send({success: false});
        }
    });
};


