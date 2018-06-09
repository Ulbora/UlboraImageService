/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
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

var HOST = "localhost";
var PORT = 3007;

//database
var DATABASE_HOST = "localhost";
var DATABASE_NAME = "ulbora_image_service";
var DATABASE_USER_NAME = "admin";
var DATABASE_USER_PASSWORD = "admin";
var DATABASE_POOL_SIZE = 5;


//cors allowed origins
var ALLOWED_ORIGINS = "*";
var CORS_ENABLED = false;


exports.HOST = HOST;
exports.PORT = PORT;
exports.ALLOWED_ORIGINS = ALLOWED_ORIGINS;
exports.CORS_ENABLED = CORS_ENABLED;

//database
exports.DATABASE_HOST = DATABASE_HOST;
exports.DATABASE_USER_NAME = DATABASE_USER_NAME;
exports.DATABASE_USER_PASSWORD = DATABASE_USER_PASSWORD;
exports.DATABASE_NAME = DATABASE_NAME;
exports.DATABASE_POOL_SIZE = DATABASE_POOL_SIZE;

