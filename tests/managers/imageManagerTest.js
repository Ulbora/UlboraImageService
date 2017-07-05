var assert = require('assert');
var db = require("../../database/db");
var imageManager = require("../../managers/imageManager");
var imgId;
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
                        orderId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    /*
    describe('#updateOrder()', function () {
        it('should update order in db', function (done) {
            var json = {
                clientId: clientId,  
                id: orderId,
                billingAddressId: 20,                
                comment: "updated order",
                payment: "online"
            };
            setTimeout(function () {
                orderManager.updateOrder(json, function (result) {
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
    
    

    describe('#getOrder()', function () {
        it('should get order in db', function (done) {
            setTimeout(function () {
                orderManager.getOrder(orderId, clientId, function (result) {
                    console.log("order res: " + JSON.stringify(result));
                    if (result && result.billingAddressId === 20 && result.comment === "updated order" &&
                            result.payment === "online" && result.orderItems && result.orderItems.length === 2) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#getOrderListByClient()', function () {
        it('should get order list by client in db', function (done) {
            setTimeout(function () {
                orderManager.getOrderListByClient(clientId, function (result) {
                    console.log("order list by client res: " + JSON.stringify(result));
                    if (result && result.length === 1 && result[0].id === orderId) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#getOrderListByCustomer()', function () {
        it('should get order list by customer in db', function (done) {
            setTimeout(function () {
                orderManager.getOrderListByCustomer(clientId, 45, function (result) {
                    if (result && result.length === 1 && result[0].id === orderId) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    
    describe('#deleteOrder()', function () {
        it('should delete order in db', function (done) {
            setTimeout(function () {
                orderManager.deleteOrder(orderId, clientId, function (result) {
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
    
    */

});



