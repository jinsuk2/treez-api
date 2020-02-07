"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
// Guard for empty Inventories / Orders
exports.emptyGuard = (order) => {
    if (!order || order.length <= 0) {
        return false;
    }
    else
        return true;
};
// Helper for Updating Inven Stock
exports.updateStock = async (id, count) => {
    await models_1.Inventory.findOneAndUpdate({ id: id }, {
        quantity: count,
        lastUpdated: new Date().toISOString()
    });
};
const helpers = {
    emptyGuard: exports.emptyGuard,
    updateStock: exports.updateStock
};
exports.default = helpers;
//# sourceMappingURL=helpers.js.map