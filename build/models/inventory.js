"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const inventorySchema = ts_mongoose_1.createSchema({
    id: ts_mongoose_1.Type.string({ unique: true, index: true }),
    name: ts_mongoose_1.Type.string(),
    description: ts_mongoose_1.Type.string(),
    price: ts_mongoose_1.Type.number(),
    quantity: ts_mongoose_1.Type.number()
});
const Inventory = ts_mongoose_1.typedModel("Inventory", inventorySchema, "treez.inventories");
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.js.map