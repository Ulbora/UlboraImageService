var assert = require('assert');
var db = require("../../database/db");
var imageManager = require("../../managers/imageManager");
var imgId;
var imgId2;
var clientId = "4984556118";
var fs = require("fs");

describe('Image Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_image_service", 5);
            setTimeout(function () {
                imageManager.init(db);
                done();
            }, 1000);
        });
    });


    describe('#addImage()', function () {
        it('should add an image in manager', function (done) {
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
                imageManager.addImage(json, function (result) {
                    if (result.success && result.id) {
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



    describe('#addImage()', function () {
        it('should add an image with space in name in manager', function (done) {
            var fileName = __dirname + "/testFiles/upload/test.jpg";
            var stats = fs.statSync(fileName);
            var file = fs.readFileSync(fileName);
            var json = {
                clientId: clientId,
                name: "test File  Name",
                size: stats.size,
                fileExtension: "jpg",
                fileData: file
            };
            setTimeout(function () {
                imageManager.addImage(json, function (result) {
                    if (result.success && result.id) {
                        imgId2 = result.id;
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
        it('should update image in manager', function (done) {
            var json = {
                clientId: clientId,
                id: imgId,
                name: "a Really Long Name"
            };
            setTimeout(function () {
                imageManager.updateImage(json, function (result) {
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


    describe('#getImageDetails()', function () {
        it('should get Image Details in manager', function (done) {
            setTimeout(function () {
                imageManager.getImageDetails(imgId, clientId, function (result) {
                    //console.log("image res: " + JSON.stringify(result));
                    if (result && result.name === "aReallyLongName") {
                        var fileName = __dirname + "/testFiles/downloaded/testfile.jpg";
                        fs.writeFileSync(fileName, result.fileData);
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
        it('should get Image in manager', function (done) {
            setTimeout(function () {
                imageManager.getImage(imgId, clientId, function (result) {
                    //console.log("image res: " + JSON.stringify(result));
                    var fileName = __dirname + "/testFiles/downloaded/testfile2.jpg";
                        fs.writeFileSync(fileName, result);
                    if (result) {                        
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
        it('should get Image page count in manager', function (done) {
            setTimeout(function () {
                imageManager.getPageCount(clientId, function (result) {
                    //console.log("image res: " + JSON.stringify(result));                    
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
        it('should get Image by client in manager', function (done) {
            setTimeout(function () {
                imageManager.getImageByClient(clientId, 1, function (result) {
                    //console.log("image res: " + JSON.stringify(result));                    
                    if (result && result.length <= 10) {                        
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
        it('should delete image in manager', function (done) {
            setTimeout(function () {
                imageManager.deleteImage(imgId, clientId, function (result) {
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

    describe('#deleteImage()', function () {
        it('should delete image in manager', function (done) {
            setTimeout(function () {
                imageManager.deleteImage(imgId2, clientId, function (result) {
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



