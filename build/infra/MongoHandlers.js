"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
// Collection of CRUD functions for Easy Referencing
// Inventory
exports.getInventory = async (id, name) => {
    return await models_1.Inventory.find(id ? { id: id } : name ? { name: name } : {});
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
    try {
        hardDelete
            ? await models_1.Inventory.findOneAndDelete({ id: id })
            : await models_1.Inventory.findOneAndUpdate({ id: id }, { active: false });
    }
    catch (e) {
        throw new Error(`Could not Delete Inventory ${id}`);
    }
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
    try {
        await models_1.Order.findByIdAndDelete({ id: id });
    }
    catch (e) {
        throw new Error(`Could not Delete Order ${id}`);
    }
    return id;
};
//# sourceMappingURL=MongoHandlers.js.map