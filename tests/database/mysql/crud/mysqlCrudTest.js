var assert = require('assert');
var db = require("../../../../database/mysql/crud/mysqlCrud");
var fs = require("fs");
var imgId;
var clientId = 45788;
describe('MYSQLCrud', function () {
    this.timeout(6000);
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
    
    describe('#insert()', function () {
        it('should insert into db', function (done) {
            var fileName = __dirname + "/testFiles/upload/test.jpg";
            var stats = fs.statSync(fileName);
            var file = fs.readFileSync(fileName);
            var q = "INSERT INTO image Set ?";            
            var args = {
                client_id: clientId,
                name: "testfile",
                size: stats.size,
                file_extension: "jpg",
                file_data: file
            };
            setTimeout(function () {
                db.insert(null, q, args, function (result) {
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

   
    
    
    describe('#update()', function () {
        it('should update row from db', function (done) {
            var q = "UPDATE image SET name = ? WHERE id = ? and client_id = ? ";
            var args = ['newBigFile', imgId, clientId];
            setTimeout(function () {
                db.update(null, q, args, function (result) {
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
    
    describe('#get()', function () {
        it('should read row from db', function (done) {
            var q = "SELECT * FROM image WHERE id = ? and client_id = ? ";
            var queryId = [imgId, clientId];
            setTimeout(function () {
                db.get(q, queryId, function (result) {
                    //console.log("result of get: " + JSON.stringify(result.data));
                    //console.log("result of get file data: " + result.data[0].file_data);
                    var fileName = __dirname + "/testFiles/downloaded/testfile.jpg";
                    fs.writeFileSync(fileName, result.data[0].file_data);
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
    
    describe('#getList()', function () {
        it('should read row from db', function (done) {
            
            var q = "SELECT * FROM image " +
                    "where client_id = ? " +
                    "order by name ";    
            var queryId = [clientId];
            setTimeout(function () {
                db.get(q, queryId, function (result) {
                    if (result.success && result.data.length === 1) {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);           
        });
    });
     
    
    describe('#delete()', function () {
        it('should delete row from db', function (done) {
            var q = "DELETE FROM image WHERE id = ? and client_id = ? ";
            var queryId = [imgId, clientId];
            setTimeout(function () {
                db.delete(null, q, queryId, function (result) {
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

