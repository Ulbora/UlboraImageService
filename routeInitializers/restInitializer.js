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



var orderService = require("../services/orderService");
var orderItemsService = require("../services/orderItemsService");
var packageService = require("../services/packageService");


exports.init = function(app, db){
    //init
    orderService.init(db);
    orderItemsService.init(db);
    packageService.init(db);    
    
    //order service
    app.post('/rs/order/add', orderService.add);
    app.put('/rs/order/update', orderService.update);
    app.get('/rs/order/get/:id/:clientId', orderService.get);
    app.get('/rs/order/list/:clientId', orderService.listByClient);    
    app.get('/rs/order/customer/list/:customerId/:clientId', orderService.listByCustomer);    
    app.delete('/rs/order/delete/:id/:clientId', orderService.delete);
    
    //order items services
    app.post('/rs/order/item/add', orderItemsService.add);      
    app.put('/rs/order/item/update', orderItemsService.update);    
    app.delete('/rs/order/item/delete/:id/:clientId', orderItemsService.delete);
    
    //package service
    app.post('/rs/order/package/add', packageService.add);      
    app.put('/rs/order/package/update', packageService.update);
    app.post('/rs/order/package/get', packageService.get);      
    app.delete('/rs/order/package/delete/:id/:clientId', packageService.delete);
    
    
};
