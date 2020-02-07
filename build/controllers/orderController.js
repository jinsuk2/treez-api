"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoHandlers_1 = require("../infra/MongoHandlers");
const enums_1 = require("../utils/enums");
const helpers_1 = require("../utils/helpers");
class OrderController {
    // Validates If Inventory has enough Items
    // For the Order and Update If Client is
    // Finishing the Order.
    async validateStock(newItems, curr, finish) {
        let total = curr;
        // Handle Each Item in the Order ItemList
        const payload = await newItems.map(async (item) => {
            return await this.createPromise(item, total, finish);
        });
        const result = await Promise.all(payload)
            .then(async (results) => await results.reduce((prev, curr) => prev + curr))
            .catch(e => {
            console.log(e, "last");
            throw new Error(e);
        });
        return result;
    }
    // Called when Client is Finishing The Order
    async finishOrder(id) {
        const order = await MongoHandlers_1.getOrder(id);
        // Error Msg for No Match
        if (!helpers_1.emptyGuard(order)) {
            throw new Error(`No Order Found for Id: ${id}`);
        }
        // Generate Payload accordingly
        const date = new Date().toISOString();
        const { email, items, total } = order[0];
        const payload = {
            id,
            email,
            items,
            status: enums_1.OrderStatus.APPROVED,
            total,
            lastUpdated: date,
            orderDatePlaced: date
        };
        return payload;
    }
    async createPromise(item, total, finish) {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, count } = item;
                // Name or Count cannot be Empty If Items are Provided
                if (!name || (!count && count < 0)) {
                    throw new Error(`Missing Name and Count of the Item`);
                }
                const inventory = await MongoHandlers_1.getInventoryByName(name);
                // Error Msg for Faulty Item in Order ItemList
                if (!inventory) {
                    throw new Error(`This Item does not exist in Inventory. Name: ${name}`);
                }
                const { id, quantity, unitPrice } = inventory;
                // Error Msg if Inventory cannot handle the order
                if (quantity - count < 0) {
                    throw new Error(`We don't have enough of this item. Try ${quantity} or less. Name: ${name}`);
                }
                if (quantity - count == 0) {
                    console.warn("This item is now Out-of-Stock");
                }
                total += unitPrice * count;
                // Update the DB for Inventory if Client is finishing the Order
                if (finish) {
                    await helpers_1.updateStock(id, quantity - count);
                }
                resolve(total);
            }
            catch (e) {
                reject(e.message);
            }
        });
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map