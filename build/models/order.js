"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const orderSchema = ts_mongoose_1.createSchema({
    id: ts_mongoose_1.Type.string({ unique: true, index: true }),
    email: ts_mongoose_1.Type.string(),
    orderDate: ts_mongoose_1.Type.string(),
    status: ts_mongoose_1.Type.string()
});
exports.orderSchema = orderSchema;
const Order = ts_mongoose_1.typedModel("Order", orderSchema, "treez.orders");
exports.Order = Order;
//# sourceMappingURL=order.js.map