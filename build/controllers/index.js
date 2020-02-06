"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventoryController_1 = require("./inventoryController");
exports.InventoryController = inventoryController_1.InventoryController;
const orderController_1 = require("./orderController");
exports.OrderController = orderController_1.OrderController;
const controllers = {
    InventoryController: inventoryController_1.InventoryController,
    OrderController: orderController_1.OrderController
};
exports.default = controllers;
//# sourceMappingURL=index.js.map