var assert = require('assert');
var db = require("../../database/db");
var imageService = require("../../services/imageService");
var tokenFile = require("./token");
var fs = require("fs");
// for this tests to pass, the tokenFile needs to be updated with a new token 
var token = tokenFile.token;
var imgId;
var imgId2;
var clientId = "64544364543";
describe('Image Service', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_image_service", 5);
            setTimeout(function () {
                imageService.init(db);
                done();
            }, 1000);
        });
    });


    describe('#add()', function () {
        it('should add a image', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                var fileName = __dirname + "/testFiles/upload/test.jpg";
                var stats = fs.statSync(fileName);
                var file = fs.readFileSync(fileName);
                file = new Buffer(file).toString('base64');
                var json = {
                    clientId: clientId,
                    name: "testfile",
                    size: stats.size,
                    fileExtension: "jpg",
                    fileData: file
                };
                req.body = json;
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {
                        imgId = val.id;
                        console.log("add order response: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                imageService.add(req, res);
            }, 1000);
        });
    });


    describe('#update()', function () {
        it('should update image', function (done) {
            setTimeout(function () {

                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.body = {
                    clientId: clientId,
                    id: imgId,
                    name: "a Really Long Name"
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("update image response: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                imageService.update(req, res);
            }, 1000);
        });
    });


    
    describe('#get()', function () {
        it('should get image', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;

                req.params = {};
                req.params.id = imgId;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.set = function(val1, val2){
                    console.log("content-type: " + val1);
                    console.log("content-type value: " + val2);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val) {                        
                        //console.log("get image details res: " + JSON.stringify(val));
                        var fileName = __dirname + "/testFiles/downloaded/testfile2.jpg";
                        fs.writeFileSync(fileName, val);
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                imageService.get(req, res);
            }, 1000);
        });
    });

    describe('#getDetails()', function () {
        it('should get image details', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.get = function(val){
                    var rtn = "";
                    if(val === "Host"){
                        rtn = "localhost:3007";
                    }
                    return rtn;
                };
                req.params = {};
                req.params.id = imgId;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("get image details res: " + JSON.stringify(val)); 
                    var testUrl = "http://localhost:3007/image/get/" + imgId + "/" + clientId;
                    if (this.statusCode === 401) {
                        assert(false);                        
                    } else if (val && val.name === "aReallyLongName" && val.imageUrl === testUrl) { 
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                imageService.getDetails(req, res);
            }, 1000);
        });
    });
    
        
    
    
    describe('#getPageCount()', function () {
        it('should get page count', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;

                req.params = {};                
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.set = function(val1, val2){
                    console.log("content-type: " + val1);
                    console.log("content-type value: " + val2);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val.pageCount && val.pageCount === 1) {                        
                        //console.log("get image details res: " + JSON.stringify(val));                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                imageService.getPageCount(req, res);
            }, 1000);
        });
    });
    
        
    
    describe('#getImageByClient()', function () {
        it('should get by client', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.get = function(val){
                    var rtn = "";
                    if(val === "Host"){
                        rtn = "localhost:3007";
                    }
                    return rtn;
                };
                req.params = {};  
                req.params.page = 1;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.set = function(val1, val2){
                    console.log("content-type: " + val1);
                    console.log("content-type value: " + val2);
                };
                res.send = function (val) {
                    var testUrl = "http://localhost:3007/image/get/" + imgId + "/" + clientId;
                    console.log("get image by client res: " + JSON.stringify(val));    
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.length === 1 && val[0].imageUrl === testUrl) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                imageService.getImageByClient(req, res);
            }, 1000);
        });
    });
    

    describe('#delete()', function () {
        it('should delete a image', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.params = {};
                req.params.id = imgId;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("delete customer reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                imageService.delete(req, res);
            }, 1000);
        });
    });

});


