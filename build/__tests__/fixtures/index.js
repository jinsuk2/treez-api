"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const enums_1 = require("../../utils/enums");
const date = new Date().toISOString();
exports.item1 = {
    id: uuid_1.v4(),
    name: "item1",
    description: "description",
    unitPrice: 1,
    quantity: 1,
    active: true,
    lastUpdated: date
};
exports.item2 = {
    id: uuid_1.v4(),
    name: "item2",
    description: "description",
    unitPrice: 2,
    quantity: 2,
    active: true,
    lastUpdated: date
};
exports.item3 = {
    id: uuid_1.v4(),
    name: "item3",
    description: "description",
    unitPrice: 3,
    quantity: 3,
    active: false,
    lastUpdated: date
};
exports.orderItem1 = {
    name: "item1",
    count: 1
};
exports.order1 = {
    id: uuid_1.v4(),
    email: "user1@email.com",
    items: [exports.orderItem1],
    total: 1,
    status: enums_1.OrderStatus.SHOPPING,
    lastUpdated: date
};
exports.invenDetail1 = {
    id: uuid_1.v4(),
    name: "detailname",
    quantity: 3,
    unitPrice: 3,
    description: "new desc",
    lastUpdated: date,
    active: true
};
exports.orderDetail1 = {
    id: uuid_1.v4(),
    email: "test",
    total: 0,
    lastUpdated: date,
    items: [],
    status: enums_1.OrderStatus.SHOPPING
};
//# sourceMappingURL=index.js.map