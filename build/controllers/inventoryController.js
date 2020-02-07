"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoHandlers_1 = require("../infra/MongoHandlers");
const inventory_1 = require("../models/inventory");
const helpers_1 = require("../utils/helpers");
class InventoryController {
    // Main Update Function
    // Handles Changes according to the Params given
    async editInventoryProcesser(id, name, description, unitPrice, quantity) {
        const inven = await MongoHandlers_1.getInventory(id);
        // Error Msg for No Match
        if (!helpers_1.emptyGuard(inven)) {
            throw new Error(`No Inventory Found for ID: ${id}`);
        }
        const item = inven[0];
        // Generate Payload to Update
        const payload = {
            id,
            name: name ? name : item.name,
            description: description ? description : item.description,
            unitPrice,
            quantity,
            active: item.active,
            lastUpdated: new Date().toISOString()
        };
        return payload;
    }
    // delete an inventory Item
    // requires itemId
    async deleteItem(id, hardDelete) {
        // Hard Delete Option
        if (hardDelete) {
            const inven = await MongoHandlers_1.getInventory(id);
            // Guard for Empty Inventory
            if (!helpers_1.emptyGuard(inven)) {
                throw new Error(`No Inventory Found for ID: ${id}`);
            }
            const { quantity } = inven[0];
            // Warning msg for Non Empty item
            if (quantity > 0) {
                console.warn(`Inventory still has ${quantity} items`);
            }
            return await MongoHandlers_1.deleteInventory(id, hardDelete);
        }
        else {
            // Soft Delete Option
            // Grabs Inventory of Id
            const inven = await MongoHandlers_1.getInventory(id);
            // Guard for Empty Inventory
            if (!helpers_1.emptyGuard(inven)) {
                throw new Error(`No Inventory Found for ID: ${id}`);
            }
            const { quantity, active } = inven[0];
            if (!active) {
                throw new Error(`Inventory Item already Deleted`);
            }
            // Warning msg for Non Empty item
            if (quantity > 0) {
                console.warn(`Inventory still has ${quantity} items`);
            }
            const result = await inventory_1.Inventory.findOneAndUpdate({ id: id }, { active: false }, { new: true });
            return result;
        }
    }
    // restore an inventory
    // requires itemId
    async restoreInventory(id) {
        // Grabs Inventory of Id
        const inven = await MongoHandlers_1.getInventory(id);
        // Error Msg for No Match
        if (!helpers_1.emptyGuard(inven)) {
            throw new Error(`No Inventory Found for ID: ${id}`);
        }
        const { name, quantity, description, unitPrice, active } = inven[0];
        if (active) {
            throw new Error(`Inventory Item already Restored`);
        }
        // Warning msg for Non Empty item
        if (quantity > 0) {
            console.warn(`Inventory is still has ${quantity} items`);
        }
        // Create Guarded Payload with details
        const payload = {
            id,
            name,
            quantity,
            unitPrice,
            lastUpdated: new Date().toISOString(),
            description,
            active: true
        };
        return payload;
    }
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventoryController.js.map