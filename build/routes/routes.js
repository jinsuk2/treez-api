"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = require("../infra/Route");
const uuid = require("uuid/v4");
const enums_1 = require("../utils/enums");
const MongoHandlers_1 = require("../infra/MongoHandlers");
exports.routes = (inventoryController, orderController) => {
    return [
        // Create New Inventory Item
        new Route_1.Route("/inventories", "post", [
            async (req, res) => {
                const { name, description, quantity, unitPrice } = req.body;
                try {
                    // Name cannot be empty
                    if (!name) {
                        throw new Error(`Name cannot be undefined for a new Item.`);
                    }
                    // Check if an Item with same name already exists.
                    const check = await MongoHandlers_1.getInventoryByName(name);
                    if (!check) {
                        throw new Error(`There already is an Item Named ${name}`);
                    }
                    // Generate Parameter to Create Inventory Item
                    const payload = {
                        id: uuid(),
                        name,
                        description,
                        quantity,
                        unitPrice,
                        active: true,
                        lastUpdated: new Date().toISOString()
                    };
                    // Update DB and send result to Client
                    const inven = await MongoHandlers_1.createInventory(payload);
                    res.status(200).send({
                        success: "Successfully Created Inventory Item!",
                        data: inven
                    });
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Get All Inventory Items
        new Route_1.Route("/inventories", "get", [
            async (req, res) => {
                try {
                    const result = await MongoHandlers_1.getInventory();
                    // An Error Msg for Empty DB Collection Cases.
                    if (result.length <= 0) {
                        throw new Error(`There is nothing in the Inventory`);
                    }
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Get Inventory Item by Id
        new Route_1.Route("/inventories/:id", "get", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    const result = await MongoHandlers_1.getInventory(id);
                    // An Error Msg for No Match
                    if (result.length <= 0) {
                        throw new Error(`There is no Item with ID: ${id}`);
                    }
                    res.status(200).send(result);
                }
                catch (e) {
                    console.log(e);
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Update Inventory Item
        new Route_1.Route("/inventories/:id", "put", [
            async (req, res) => {
                const { id } = req.params;
                const { name = "", description = "", quantity, unitPrice } = req.body;
                try {
                    // Check if Item exists in DB
                    const check = await MongoHandlers_1.getInventory(id);
                    if (check.length != 1) {
                        throw new Error(`There is no Item with ID: ${id}`);
                    }
                    // Update or keep Original Info IF not provided.
                    let count = check[0].quantity;
                    let newPrice = check[0].unitPrice;
                    if (quantity || quantity == 0) {
                        count = quantity;
                    }
                    if (unitPrice || unitPrice == 0) {
                        newPrice = unitPrice;
                    }
                    // Generate parameters to Update Inventory Item
                    const payload = await inventoryController.editInventoryProcesser(id, name, description, newPrice, count);
                    // Update DB and send result to client
                    const result = await MongoHandlers_1.updateInventory(id, payload);
                    res.status(200).send({
                        success: "Successfully Updated Inventory Item!",
                        data: result
                    });
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Delete Inventory
        new Route_1.Route("/inventories/:id", "delete", [
            async (req, res) => {
                const { id } = req.params;
                // Secret Parameter for Soft Deleting Items
                const { soft = false } = req.body;
                try {
                    // Handles both Hard and Soft Delete
                    // Update DB Accordingly
                    const result = await inventoryController.deleteItem(id, soft ? false : true);
                    res.status(200).send({
                        success: "Successfully Deleted Inventory Item!",
                        data: soft ? result : null
                    });
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Restore Inventory
        new Route_1.Route("/inventories/restore/:id", "put", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    // Restore a Soft Deleted Item
                    const payload = await inventoryController.restoreInventory(id);
                    const result = await MongoHandlers_1.updateInventory(id, payload);
                    res.status(200).send({
                        success: "Successfully Restored Inventory Item!",
                        data: result
                    });
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Create New Order
        new Route_1.Route("/orders", "post", [
            async (req, res) => {
                const { email, items = [], finish = false } = req.body;
                let total = 0;
                try {
                    // Email cannot be empty
                    if (!email) {
                        throw new Error(`Email cannot be undefined for a new Order.`);
                    }
                    // Update Total and Inventory stock
                    if (items.length > 0) {
                        total = await orderController.validateStock(items, total, finish);
                    }
                    // Generate Parameter to Create new Order
                    const payload = {
                        id: uuid(),
                        email,
                        status: finish ? enums_1.OrderStatus.APPROVED : enums_1.OrderStatus.SHOPPING,
                        items,
                        total: total,
                        lastUpdated: new Date().toISOString()
                    };
                    // Update DB and Send
                    const result = await MongoHandlers_1.createOrder(payload);
                    res.status(200).send({
                        success: "Successfully Created new Order!",
                        data: result
                    });
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Get All Orders
        new Route_1.Route("/orders", "get", [
            async (req, res) => {
                try {
                    const result = await MongoHandlers_1.getOrder();
                    // Error Msg for Empty DB Collection
                    if (result.length <= 0) {
                        throw new Error(`There are No Active Orders`);
                    }
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Get Order by Id
        new Route_1.Route("/orders/:id", "get", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    const result = await MongoHandlers_1.getOrder(id);
                    // Error Msg for No Match
                    if (result.length <= 0) {
                        throw new Error(`There is no Order with ID: ${id}`);
                    }
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Update Order
        new Route_1.Route("/orders/:id", "put", [
            async (req, res) => {
                const { id } = req.params;
                const { email = "", finish = false, items = [] } = req.body;
                try {
                    let total = 0;
                    let order;
                    const orderList = await MongoHandlers_1.getOrder(id);
                    // Error Msg for No Match
                    if (orderList.length <= 0) {
                        throw new Error(`There is not such Order. ID: ${id}`);
                    }
                    order = orderList[0];
                    // Warning msg for Editing Order already Approved
                    if (order.status == enums_1.OrderStatus.APPROVED) {
                        console.warn("This Order is Already Approved");
                    }
                    // Handle Items Change and Update Inventory Stock
                    if (items.length > 0) {
                        total = await orderController.validateStock(items, total, finish);
                    }
                    // Generate Parameters for Update Order
                    const payload = {
                        id,
                        email: email ? email : order.email,
                        status: finish ? enums_1.OrderStatus.APPROVED : enums_1.OrderStatus.SHOPPING,
                        items: items,
                        total,
                        lastUpdated: new Date().toISOString()
                    };
                    // Update Db and Send
                    const result = await MongoHandlers_1.updateOrder(id, payload);
                    res.status(200).send({
                        success: "Successfully Updated Order!",
                        data: result
                    });
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Delete Order
        new Route_1.Route("/orders/:id", "delete", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    const result = await MongoHandlers_1.deleteOrder(id);
                    res.status(200).send({
                        success: "Successfully Deleted Order!",
                        data: result
                    });
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ])
    ];
};
//# sourceMappingURL=routes.js.map