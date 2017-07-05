var assert = require('assert');
var db = require("../../../database/mysql/db");
var imgId;
var clientId = 5584567;
var fs = require("fs");


describe('mysql DB details', function () {
    this.timeout(20000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_image_service", 5);
            db.testConnection(function (success) {
                if (success) {
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });


    describe('#addImage()', function () {
        it('should add a image in mysql db', function (done) {
            var fileName = __dirname + "/testFiles/upload/test.jpg";
            var stats = fs.statSync(fileName);
            var file = fs.readFileSync(fileName);
            var json = {
                clientId: clientId,
                name: "testfile",
                size: stats.size,
                fileExtension: "jpg",
                fileData: file
            };
            setTimeout(function () {
                db.addImage(json, function (result) {
                    console.log("image result: " + JSON.stringify(result));
                    if (result.id > -1) {
                        imgId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#updateImage()', function () {
        it('should update a image in mysql db', function (done) {
            var json = {
                name: "aReallyBigImage",
                id: imgId,
                clientId: clientId
            };
            setTimeout(function () {
                db.updateImage(json, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#getImage()', function () {
        it('should get image in mysql db', function (done) {
            setTimeout(function () {
                db.getImage(imgId, clientId, function (result) {
                    //console.log("product detail: " + JSON.stringify(result));
                    var fileName = __dirname + "/testFiles/downloaded/testfile.jpg";
                    fs.writeFileSync(fileName, result.fileData);
                    if (result.id && result.name === "aReallyBigImage") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });



    describe('#getPageCount()', function () {
        it('should get page count in mysql db', function (done) {
            setTimeout(function () {
                db.getPageCount(clientId, function (result) {
                    console.log("page count result: " + JSON.stringify(result));
                    if (result.pageCount && result.pageCount === 1) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#getImageByClient()', function () {
        it('should get image list by client in mysql db', function (done) {
            setTimeout(function () {

                db.getImageByClient(clientId, 1, function (result) {
                    //console.log("image list: " + JSON.stringify(result));                    
                    if (result && result.length <= 10) {
                        console.log("image list length: " + result.length);
                        assert(true);

                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#deleteImage()', function () {
        it('should delete image in mysql db', function (done) {
            setTimeout(function () {
                db.deleteImage(imgId, clientId, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

});

