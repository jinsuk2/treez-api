"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
// Schema for a single Inventory Item
const inventorySchema = ts_mongoose_1.createSchema({
    id: ts_mongoose_1.Type.string({ unique: true, index: true }),
    name: ts_mongoose_1.Type.string({ unique: true, index: true }),
    quantity: ts_mongoose_1.Type.number({ default: 0 }),
    unitPrice: ts_mongoose_1.Type.number({ default: 0 }),
    description: ts_mongoose_1.Type.string(),
    // Optional: if Items require Heavy Details, switch ID[] to Item[]
    itemIds: ts_mongoose_1.Type.array({ default: [], index: false }).of(ts_mongoose_1.Type.string()),
    lastUpdated: ts_mongoose_1.Type.string(),
    active: ts_mongoose_1.Type.boolean({ default: true })
});
const Inventory = ts_mongoose_1.typedModel("Inventory", inventorySchema, "treez.inventory");
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.js.map