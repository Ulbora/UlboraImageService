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

var crud = require("./crud/mysqlCrud");
var query = require("./queries/imageQueries");
var pageSize = 10;
//var barCodeProcessor = require("./processors/barCodeProcessor");
//var detailsProcessor = require("./processors/detailsProcessor");
//var optionsProcessor = require("./processors/optionsProcessor");
//var productProcessor = require("./processors/productProcessor");

exports.connect = function (host, user, pw, db, cpnum) {
    crud.connect(host, user, pw, db, cpnum);
    //barCodeProcessor.init(crud);
    //detailsProcessor.init(crud);
    //optionsProcessor.init(crud);
    //productProcessor.init(crud);
};
// for testing only
exports.testConnection = function (callback) {
    crud.testConnection(callback);
};

// for testing only
exports.getConnection = function (callback) {
    crud.getConnection(callback);
};

exports.addImage = function (json, callback) {
    var args = {
        client_id: json.clientId,
        name: json.name,
        size: json.size,
        file_extension: json.fileExtension,
        file_data: json.fileData
    };
    crud.insert(null, query.IMAGE_INSERT_QUERY, args, function (result) {
        var rtn = {
            id: result.id,
            clientId: json.clientId,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};

exports.updateImage = function (json, callback) {
    var args = [
        json.name,
        json.id,
        json.clientId
    ];
    // console.log("json: " + JSON.stringify(json));
    crud.update(null, query.IMAGE_UPDATE_QUERY, args, callback);
};

exports.getImage = function (id, clientId, callback) {
    var queryId = [id, clientId];
    crud.get(query.IMAGE_GET_BY_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                id: result.data[0].id,
                name: result.data[0].name,
                size: result.data[0].size,
                fileExtension: result.data[0].file_extension,
                fileData: result.data[0].file_data,
                clientId: result.data[0].client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};


exports.getPageCount = function (clientId, callback) {
    var queryId = [clientId];
    crud.get(query.IMAGE_COUNT_BY_CLIENT, queryId, function (result) {
        var rtn = {
            pageCount: 0
        };
        if (result.success && result.data.length > 0) {
            var cnt = result.data[0].imageCount;
            var pages = cnt / pageSize;
            pages = Math.ceil(pages);
            rtn.pageCount = pages;
            callback(rtn);
        } else {
            callback(null);
        }
    });
};


exports.getImageByClient = function (clientId, page, callback) {
    var offset = 0;
    if(page !== null && page !== undefined && Number.isInteger(page)){
        offset = --page;
    }
    var queryId = [
        clientId
    ];
    
    var listQuery = "SELECT * FROM image " +                    
                    "where client_id = ? " +
                    "order by name " + 
                    "LIMIT " + offset + ", " + pageSize;// + " ";
    console.log("query: " + listQuery);
    crud.get(listQuery, queryId, function (result) {
        //console.log("images: " + JSON.stringify(result));
        if (result.success && result.data.length > 0) {
            var rtnList = [];
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    id: result.data[cnt].id,
                    name: result.data[cnt].name,
                    size: result.data[cnt].size,
                    fileExtension: result.data[cnt].file_extension,
                    fileData: result.data[cnt].file_data,
                    clientId: result.data[cnt].client_id
                };
                rtnList.push(rtn);
            }
            callback(rtnList);
        } else {
            callback(rtnList);
        }
    });
};

exports.deleteImage = function (id, clientId, callback) {
    var queryId = [id, clientId];
    crud.delete(null, query.IMAGE_DELETE_QUERY, queryId, callback);
};
