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
                    const check = await MongoHandlers_1.getInventory(null, name);
                    if (check.length > 0) {
                        res.status(404).send(`There already is an Item Named ${name}`);
                        return;
                    }
                    const payload = {
                        id: uuid(),
                        name,
                        description,
                        quantity,
                        unitPrice,
                        active: true,
                        lastUpdated: new Date().toISOString()
                    };
                    const inven = await MongoHandlers_1.createInventory(payload);
                    res.status(200).send(inven);
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
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Update Inventory Item
        new Route_1.Route("/inventories/:id", "put", [
            async (req, res) => {
                const { id } = req.params;
                const { name = "", description = "", quantity = 0, unitPrice = 0 } = req.body;
                try {
                    let payload;
                    const check = await MongoHandlers_1.getInventory(id);
                    if (check.length != 1) {
                        res.status(404).send(`There is no Item Named ${name}`);
                        return;
                    }
                    payload = await inventoryController.editInventory(id, name, description, unitPrice, quantity);
                    const result = await MongoHandlers_1.updateInventory(id, payload);
                    res.status(200).send(result);
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
                const { hard } = req.body;
                try {
                    const result = await inventoryController.deleteItem(id, hard ? true : false);
                    res.status(200).send(result);
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
                    const result = await inventoryController.restoreInventory(id);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Create New Order
        new Route_1.Route("/orders", "post", [
            async (req, res) => {
                const { email } = req.body;
                try {
                    const payload = {
                        id: uuid(),
                        email,
                        status: enums_1.OrderStatus.SHOPPING,
                        items: [],
                        total: 0
                    };
                    const result = await MongoHandlers_1.createOrder(payload);
                    res.status(200).send(result);
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
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        // Update Order
        new Route_1.Route("/orders/:id/:itemId", "put", [
            async (req, res) => {
                const { id, itemId } = req.params;
                const { email = "", status = "", items = [], total = 0, count = 0 } = req.body;
                try {
                    let payload = await orderController.updateOrderItems(id, itemId, count);
                    console.log(payload);
                    const result = await MongoHandlers_1.updateOrder(id, payload.payload);
                    const tmp = await MongoHandlers_1.updateInventory(itemId, payload.inventoryPayload);
                    console.log(tmp, result);
                    res.status(200).send({ result, tmp });
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
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ])
    ];
};
//# sourceMappingURL=routes.js.map