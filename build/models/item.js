"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
// Schema for a single ItemType in an Order
exports.orderItemSchema = ts_mongoose_1.createSchema({
    itemId: ts_mongoose_1.Type.string({ unique: true, index: true, sparse: true }),
    itemName: ts_mongoose_1.Type.string({ unique: true, index: true, sparse: true }),
    count: ts_mongoose_1.Type.number({ default: 0 })
});
//# sourceMappingURL=item.js.map