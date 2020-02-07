"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
// Collection of CRUD functions for Easy Referencing
// Inventory
exports.getInventory = async (id) => {
    return await models_1.Inventory.find(id ? { id: id } : {});
};
exports.getInventoryByName = async (name) => {
    return await models_1.Inventory.findOne({ name: name });
};
exports.updateInventory = async (id, updateBody) => {
    return await models_1.Inventory.findOneAndUpdate({ id: id }, updateBody, {
        new: true
    });
};
exports.createInventory = async (updateBody) => {
    return await models_1.Inventory.create(updateBody);
};
exports.deleteInventory = async (id, hardDelete) => {
    if (!(await models_1.Inventory.findOne({ id: id }))) {
        throw new Error(`Inventory with ${id} doesn't exist!`);
    }
    if (hardDelete) {
        await models_1.Inventory.deleteOne({ id: id }).catch(e => {
            throw new Error(`Could not Delete Inventory ${id} error: ${e.message}`);
        });
    }
    else
        await models_1.Inventory.findOneAndUpdate({ id: id }, { active: false }).catch(e => {
            throw new Error(`Could not Delete Inventory ${id} error: ${e.message}`);
        });
    return id;
};
// Order
exports.getOrder = async (id) => {
    return await models_1.Order.find(id ? { id: id } : {});
};
exports.updateOrder = async (id, updateBody) => {
    return await models_1.Order.findOneAndUpdate({ id: id }, updateBody, { new: true });
};
exports.createOrder = async (updateBody) => {
    return await models_1.Order.create(updateBody);
};
exports.deleteOrder = async (id) => {
    if (!(await models_1.Order.findOne(id))) {
        throw new Error(`Order doesn't exist. ID: ${id}`);
    }
    await models_1.Order.deleteOne({ id: id }).catch(e => {
        throw new Error(`Could not Delete Order ${id}`);
    });
    return id;
};
const handlers = {
    getInventory: exports.getInventory,
    getInventoryByName: exports.getInventoryByName,
    updateInventory: exports.updateInventory,
    createInventory: exports.createInventory,
    deleteInventory: exports.deleteInventory,
    getOrder: exports.getOrder,
    updateOrder: exports.updateOrder,
    createOrder: exports.createOrder,
    deleteOrder: exports.deleteOrder
};
exports.default = handlers;
//# sourceMappingURL=MongoHandlers.js.map