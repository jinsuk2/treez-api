"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoHandlers_1 = require("../infra/MongoHandlers");
class InventoryController {
    constructor() {
        // Guard for empty Inventories
        this.emptyGuard = (inven) => {
            if (!inven || inven.length <= 0) {
                return false;
            }
            else
                return true;
        };
    }
    // Main Update Function
    // Handles Changes according to the Params given
    async editInventory(id, name, description, unitPrice, quantity) {
        const inven = await MongoHandlers_1.getInventory(id);
        if (!this.emptyGuard(inven)) {
            throw new Error(`No Inventory Found for ID: ${id}`);
        }
        const item = inven[0];
        const payload = {
            id,
            name: name ? name : item.name,
            description: description ? description : item.description,
            unitPrice: unitPrice ? unitPrice : item.unitPrice,
            quantity: quantity
                ? this.updateQuantity(item.quantity, quantity)
                : item.quantity,
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
            return await MongoHandlers_1.deleteInventory(id, hardDelete).catch(e => {
                throw new Error(`Couldn't Delete Inventory ID: ${id}. Message: ${e.message}`);
            });
        }
        else {
            // Grabs Inventory of Id
            const inven = await MongoHandlers_1.getInventory(id);
            // Guard for Empty Inventory
            if (!this.emptyGuard(inven)) {
                throw new Error(`No Inventory Found for Id: ${id}`);
            }
            const { name, quantity, description, unitPrice } = inven[0];
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
                active: false
            };
            return payload;
        }
    }
    // restore an inventory
    // requires itemId
    async restoreInventory(id) {
        // Grabs Inventory of Id
        const inven = await MongoHandlers_1.getInventory(id);
        if (!this.emptyGuard(inven)) {
            throw new Error(`No Inventory Found for Id: ${id}`);
        }
        const { name, quantity, description, unitPrice } = inven[0];
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
    // update quantity of an item
    updateQuantity(quantity, count) {
        let change = count ? count : 0;
        const total = change ? change : quantity + 1;
        return total;
    }
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventoryController.js.map