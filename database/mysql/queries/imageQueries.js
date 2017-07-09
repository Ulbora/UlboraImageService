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

//client   
exports.IMAGE_INSERT_QUERY = "INSERT INTO image Set ?";

exports.IMAGE_UPDATE_QUERY = "UPDATE image SET name = ? " +                                
                             "WHERE id = ? and client_id = ? ";
                        
                              
exports.IMAGE_GET_BY_QUERY = "SELECT file_extension, file_data " + 
                             "FROM image WHERE id = ? and client_id = ? ";

exports.IMAGE_DETAILS_GET_BY_QUERY = "SELECT id, name, size, file_extension, client_id " +
                                     "FROM image WHERE id = ? and client_id = ? ";

exports.IMAGE_DELETE_QUERY = "DELETE FROM image WHERE id = ? and client_id = ? ";

exports.IMAGE_COUNT_BY_CLIENT = "SELECT count(*) as imageCount FROM image "  +
                                "WHERE client_id = ? ";
                      
exports.IMAGE_LIST_BY_CLIENT_QUERY = "SELECT * FROM image " +
                                     "where client_id = ? " +
                                     "order by name ";                      
