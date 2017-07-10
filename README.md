Ulbora Image Service 
==============

Image Micro Service

## Headers
Content-Type: application/json (for POST and PUT)
Authorization: Bearer atToken
clientId: clientId (example 33477)


## Add Image

```
POST:
URL: http://localhost:3007/rs/image/add

Example Request
{  
   "clientId":"403",
   "name":"testfile",
   "size":15827,
   "fileExtension":"jpg",
   "fileData":"base64 string image data See Note"
}
Note: Use the following code in Node to send image data in JSON

jsonBode.fileData = new Buffer(req.file.buffer).toString('base64');
  
```

See implementation code here: https://github.com/Ulbora/UlboraImageUploadTestClient/blob/master/controller.js

```
Example Response   

{
  "success": true,
  "id": 176,
  "clientId": "403",
  "message": ""
}

```

## Update Image

```
PUT:
URL: http://localhost:3007/rs/image/update

Example Request
{
   "clientId":403,
   "id":160,
   "name": "a New Name"
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```

## Get Image

```
GET:
URL: http://localhost:3007/image/get/275/403

(note: this service does not require an Oauth2 Token)
  
```

```
Example Response   

The image displayed

```



## Get Image Details

```
GET:
URL: http://localhost:3007/rs/image/details/160/403
  
```

```
Example Response   

{
    "id": 160,
    "name": "aNewNamefortheImage",
    "size": 15827,
    "fileExtension": "jpg",
    "clientId": 403,
    "imageUrl": "http://localhost:3007/image/get/160/403"
}

```


## Get Image Page Count for a client id

```
GET:
URL: http://localhost:3007/rs/image/page/count/403
  
```

```
Example Response   

{
    "pageCount": 1
}

```



## Get Image List by client id

```
GET:
URL: http://localhost:3007/rs/image/list/403/1

(Note: http://localhost:3007/rs/image/list/clientId/pageNumber)
  
```

```
Example Response   

[
    {
        "id": 160,
        "name": "aNewNamefortheImage",
        "size": 15827,
        "fileExtension": "jpg",
        "clientId": 403,
        "imageUrl": "http://localhost:3007/image/get/160/403"
    }
]

```


## Delete Image

```
DELETE:
URL: http://localhost:3007/rs/image/delete/160/403
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```
