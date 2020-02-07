"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const item_1 = require("./item");
const enums_1 = require("../utils/enums");
// Schema for a single Order created by a customer
const orderSchema = ts_mongoose_1.createSchema({
    id: ts_mongoose_1.Type.string({ unique: true, index: true }),
    email: ts_mongoose_1.Type.string(),
    status: ts_mongoose_1.Type.string({ default: enums_1.OrderStatus.SHOPPING }),
    items: ts_mongoose_1.Type.array({ default: [], index: false }).of(item_1.orderItemSchema),
    total: ts_mongoose_1.Type.number({ default: 0 }),
    lastUpdated: ts_mongoose_1.Type.string(),
    orderDatePlaced: ts_mongoose_1.Type.string()
});
exports.orderSchema = orderSchema;
const Order = ts_mongoose_1.typedModel("Order", orderSchema, "treez.orders");
exports.Order = Order;
//# sourceMappingURL=order.js.map