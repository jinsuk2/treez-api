# Treez-Api

## Getting started

## Requirements

- NodeJS v10.7.0+ (https://nodejs.org)
- NPM & NPM account
- MongoDB 4.1.x (https://mongodb.com)
- TypeScript 3.7.5^

### Downloading/updating the dependencies (node modules)

First Step is to Clone this repository and install the necessary npm packages for the api.
```
git clone https://github.com/jinsukkim94/treez-api.git
```

Open Terminal at the Repository's main Folder.

```
npm install
```

## Running the app
There are a variety of prerequisites which must be configured before running the app. 

### Building
To Build, run:
PC Users:
```
npm run buildWin
```
Mac Users:
```
npm run build
```

### Starting
This app uses MongoDB as its Database and is currently set the location of DB to your local machine. (By Default, Mongo sets its path here `mongodb://localhost:27017/treez_api_collection`
You can change to your own Mongo database by adding your MongoUri to the constructor of TreezApi. (Refer to main index.ts line 18-20)

Finally, to start the app:
```
npm start
```

API will be running at [localhost:3000](http://localhost:3000/).
The Api will start by listing the user all the possible routes it supports. For more details, refer to [Postman Collection](https://github.com/jinsukkim94/treez-api/blob/master/src/routes/dictionary.json).

### Running the tests
To Test, run:
```
npm test
```

It should also produce a coverage file for Test results that are not included in the git.

## Routes
Here are the list of routes:
```
post: http://localhost:3000/inventories
get: http://localhost:3000/inventories
get: http://localhost:3000/inventories/:id
put: http://localhost:3000/inventories/:id
delete: http://localhost:3000/inventories/:id
put: http://localhost:3000/inventories/restore/:id
post: http://localhost:3000/orders
get: http://localhost:3000/orders
get: http://localhost:3000/orders/:id
put: http://localhost:3000/orders/:id
delete: http://localhost:3000/orders/:id
```

(NOTE TO REVIEWER: I have separately added a couple more requests such as Get Inventory By Id or Restore Inventory for better design purposes. Refer to explanation below.)

### Inventories
Inventory Collection supports Individual Items that can be stored in an Inventory. An Example of a single Item is:
```
{
    "id" : "eb51539b-b937-40da-9f07-f6d72dc80e8e",
    "name" : "item1",
    "quantity" : 2,
    "unitPrice" : 2,
    "itemIds" : [],
    "active" : true,
    "description" : "This is item1",
    "lastUpdated" : "2020-02-07T21:45:02.542Z",
}
```

Each Item must have an Unique Name, ID. Item has 3 extra fields: 
```
active, lastUpdated, itemIds
```
Active field is a marker to allow users to choose between Hard or Soft Delete of an inventory.
Active will be false for a soft Deleted Inventory.

LastUpdated field is a timestamp to keep track of last action on this entity.
It will be useful for keeping track of Queues for multiple users.

ItemIds is an optional list that can be extended for future designs if Individual Items require heavier details.
It will allow ease of access and scaling when the database expands.

### Orders
Orders Collection supports Individual Orders that are created by a User. An Example of a single Order is:
```
{
    "id" : "2bc2282e-ae7e-481f-b384-f00324db21b7",
    "status" : "SHOPPING",
    "total" : 5,
    "email" : "user1@email.com",
    "items" : [ 
        {
            "name" : "item2"
            "count" : 2,
        }, 
        {
            "name" : "item1",
            "count" : 1,
        }
    ],
    "lastUpdated" : "2020-02-07T23:15:12.889Z"
}
```
Items field is tweaked from the Original Document so it holds both Name and Count of the Items of the expected order.
This forms a direct relationship with Inventory to update Inventory Collection along with the items and counts presented on the Items.

(NOTE: Inventory is never updated until Order status is Approved. This way, all users will have the same record of Inventory to avoid conflicts before actual Transaction happens.)

### Extra Notes
There are some Routes that require a specific `Body` to be used for POST/PUT.
```
POST: http://localhost:3000/inventories
{
	"name": "item name", // Cannot be Empty
	"quantity": 10, // default: 0
	"unitPrice": 30, // default: 0
	"description": "This is item3." // default: "No Description"
}

PUT: http://localhost:3000/inventories/:id
{
  "name": "New name"
	"quantity": 1,
	"unitPrice": 1,
	"description": "new Description"
}

DELETE: http://localhost:3000/inventories/:id
{
  "soft": true // Soft Delete mode. Default: Hard delete
}

POST: http://localhost:3000/orders
PUT: http://localhost:3000/orders
{
	"email": "user@email.com", // Required.
	"items": [                 // Requires 2 fields: {name: item name, count: number}
    {
		"name": "new2",
		"count": 2
	  },
    {
		"name": "item1",
		"count": 1
	  }
  ],
  // Finishing an Order to Approved status. Defaulted to false. 
  // True will update Inventory Stock.
  "finish": true 
}
```
