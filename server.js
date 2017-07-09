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

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var conf = require('./configuration');
var cors = require('./cors/cors');
var restInitializer = require('./routeInitializers/restInitializer');
var db = require("./database/db");
db.connectDb(conf);


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
restInitializer.init(app, db);   
if (conf.CORS_ENABLED) {
    app.use(cors.CORS);
}
app.listen(process.env.PORT || conf.PORT);
