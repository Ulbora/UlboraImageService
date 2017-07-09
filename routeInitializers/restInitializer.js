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



var imageService = require("../services/imageService");

exports.init = function(app, db){
    //init
    imageService.init(db);    
    
    //image service
    app.post('/rs/image/add', imageService.add);
    app.put('/rs/image/update', imageService.update);
    app.get('/image/get/:id/:clientId', imageService.get);
    app.get('/rs/image/details/:id/:clientId', imageService.getDetails);
    app.get('/rs/image/page/count/:clientId', imageService.getPageCount);    
    app.get('/rs/image/list/:clientId/:page', imageService.getImageByClient); 
    app.delete('/rs/image/delete/:id/:clientId', imageService.delete);
    
};
