Ulbora Order Service 
==============

Order Micro Service

## Headers
Content-Type: application/json (for POST and PUT)
Authorization: Bearer atToken
clientId: clientId (example 33477)


## Add Order

```
POST:
URL: http://localhost:3006/rs/order/add

Example Request
{
   "clientId":403,
   "customerId":45,
   "orderItems":[
      {
         "product":1,
         "sku":"0010021455",
         "orderedQty":1,
         "cancelQty":0,
         "returnedQty":0,
         "backOrderedQty":0,
         "retailPrice":19.95,
         "status":"ordered",
         "orderType":"online",
         "comment":""
      },
      {
         "product":2,
         "sku":"0010021456",
         "orderedQty":1,
         "cancelQty":0,
         "returnedQty":0,
         "backOrderedQty":0,
         "retailPrice":19.95,
         "status":"ordered",
         "orderType":"online",
         "comment":""
      }
   ]
}
  
```

```
Example Response   

{
  "success": true,
  "id": 176,
  "clientId": "403",
  "message": ""
}

```

## Update Order

```
PUT:
URL: http://localhost:3006/rs/order/update

Example Request
{
   "clientId":403,
   "id": 1,
   "customerId":45,
   "billingAddressId": 2,
   "comment": "",
   "payment": ""
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```

## Get Order

```
GET:
URL: http://localhost:3006/rs/order/get/1/403
  
```

```
Example Response   

{
    "id": 1,
    "customerId": 45,
    "billingAddressId": 2,
    "orderDate": "2017-07-03T04:00:00.000Z",
    "comment": "",
    "payment": "",
    "clientId": 403,
    "orderItems": [
        {
            "id": 1,
            "product": 1,
            "sku": "0010021455",
            "orderedQty": 1,
            "cancelQty": 0,
            "returnedQty": 0,
            "backOrderedQty": 0,
            "retailPrice": 19.95,
            "status": "ordered",
            "orderType": "online",
            "comment": "",
            "orderId": 1,
            "clientId": 403
        },
        {
            "id": 2,
            "product": 2,
            "sku": "0010021456",
            "orderedQty": 1,
            "cancelQty": 0,
            "returnedQty": 0,
            "backOrderedQty": 0,
            "retailPrice": 19.95,
            "status": "ordered",
            "orderType": "online",
            "comment": "",
            "orderId": 1,
            "clientId": 403
        }
    ]
}

```



## Get Order by client

```
GET:
URL: http://localhost:3006/rs/order/list/403
  
```

```
Example Response   

[
    {
        "id": 1,
        "customerId": 45,
        "billingAddressId": 2,
        "orderDate": "2017-07-03T04:00:00.000Z",
        "comment": "",
        "payment": "",
        "clientId": 403
    }
]

```


## Get Order by customer

```
GET:
URL: http://localhost:3006/rs/order/customer/list/45/403
  
```

```
Example Response   

[
    {
        "id": 1,
        "customerId": 45,
        "billingAddressId": 2,
        "orderDate": "2017-07-03T04:00:00.000Z",
        "comment": "",
        "payment": "",
        "clientId": 403
    }
]

```



## Delete Order

```
DELETE:
URL: http://localhost:3006/rs/order/delete/1/403
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```


## Add Order Item

```
POST:
URL: http://localhost:3006/rs/order/item/add

Example Request
{
   "product":6,
   "sku":"0010021444",
   "orderedQty":1,
   "cancelQty":0,
   "returnedQty":0,
   "backOrderedQty":0,
   "retailPrice":19.95,
   "status":"ordered",
   "orderType":"online",
   "comment":"",
   "clientId":403,
   "orderId":2
}
  
```

```
Example Response   

{
  "success": true,
  "id": 176,
  "clientId": "403",
  "message": ""
}

```


## Update Order Item

```
PUT:
URL: http://localhost:3006/rs/order/item/update

Example Request
{
   "orderedQty":10,
   "cancelQty":9,
   "returnedQty":0,
   "backOrderedQty":0,
   "retailPrice":19.95,
   "status":"ordered",
   "orderType":"online",
   "comment":"",
   "clientId":403,
   "id":6
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```



## Delete Order Item

```
DELETE:
URL: http://localhost:3006/rs/order/item/delete/6/403
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```




## Add Package

```
POST:
URL: http://localhost:3006/rs/order/package/add

Example Request
{
   "tracking":"",
   "shippingAddressId":10,
   "shippingCost":9.95,
   "comment":"",
   "orderId":2,
   "clientId":403,
   "packageItems":[
      {
         "orderItemId":3
      },
      {
         "orderItemId":4
      }
   ]
}
  
```

```
Example Response   

{
  "success": true,
  "id": 86,
  "message": ""
}

```


## Update Package

```
PUT:
URL: http://localhost:3006/rs/order/package/update

Example Request
{
   "shippedDate": "2017-07-03",
   "tracking":"",
   "shippingAddressId":10,
   "shippingCost":7.95,
   "comment":"",
   "id":2,
   "clientId":403
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```




## Get Package

```
POST:
URL: http://localhost:3006/rs/order/package/get

Example Request:
{
   "clientId":403,
   "orderId":2
}
  
```

```
Example Response   

[
    {
        "shippedDate": "2017-07-03T04:00:00.000Z",
        "tracking": "",
        "shippingAddressId": 10,
        "packageNumber": 1,
        "shippingCost": 7.95,
        "packageComments": "",
        "orderItemId": 3,
        "product": 1,
        "sku": "0010021455",
        "orderedQty": 1,
        "cancelQty": 0,
        "returnedQty": 0,
        "backOrderedQty": 0,
        "retailPrice": 19.95,
        "orderItemStatus": "ordered",
        "orderType": "online",
        "itemComments": "",
        "orderId": 2,
        "clientId": 403,
        "customerId": 45,
        "billingAddressId": null,
        "orderDate": "2017-07-03T04:00:00.000Z",
        "orderComments": null,
        "payment": null
    },
    {
        "shippedDate": "2017-07-03T04:00:00.000Z",
        "tracking": "",
        "shippingAddressId": 10,
        "packageNumber": 1,
        "shippingCost": 7.95,
        "packageComments": "",
        "orderItemId": 4,
        "product": 2,
        "sku": "0010021456",
        "orderedQty": 1,
        "cancelQty": 0,
        "returnedQty": 0,
        "backOrderedQty": 0,
        "retailPrice": 19.95,
        "orderItemStatus": "ordered",
        "orderType": "online",
        "itemComments": "",
        "orderId": 2,
        "clientId": 403,
        "customerId": 45,
        "billingAddressId": null,
        "orderDate": "2017-07-03T04:00:00.000Z",
        "orderComments": null,
        "payment": null
    },
    {
        "shippedDate": "2017-07-03T04:00:00.000Z",
        "tracking": "",
        "shippingAddressId": 10,
        "packageNumber": 2,
        "shippingCost": 19.95,
        "packageComments": "",
        "orderItemId": 5,
        "product": 1,
        "sku": "0010021455",
        "orderedQty": 1,
        "cancelQty": 0,
        "returnedQty": 0,
        "backOrderedQty": 0,
        "retailPrice": 19.95,
        "orderItemStatus": "ordered",
        "orderType": "online",
        "itemComments": "",
        "orderId": 2,
        "clientId": 403,
        "customerId": 45,
        "billingAddressId": null,
        "orderDate": "2017-07-03T04:00:00.000Z",
        "orderComments": null,
        "payment": null
    }
]

```



## Delete Package

```
DELETE:
URL: http://localhost:3006/rs/order/package/delete/3/403
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```

