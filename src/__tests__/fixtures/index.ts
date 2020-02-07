import { v4 as uuid } from "uuid";
import { InventoryProps, InventoryDetails } from "../../models/inventory";
import { ObjectID } from "mongodb";
import { OrderStatus } from "../../utils/enums";
import { OrderDetails } from "../../models/order";

const date = new Date().toISOString();

export const item1 = {
  id: uuid(),
  name: "item1",
  description: "description",
  unitPrice: 1,
  quantity: 1,
  active: true,
  lastUpdated: date
};
export const item2 = {
  id: uuid(),
  name: "item2",
  description: "description",
  unitPrice: 2,
  quantity: 2,
  active: true,
  lastUpdated: date
};
export const item3 = {
  id: uuid(),
  name: "item3",
  description: "description",
  unitPrice: 3,
  quantity: 3,
  active: false,
  lastUpdated: date
};
export const orderItem1 = {
  name: "item1",
  count: 1
};
export const order1 = {
  id: uuid(),
  email: "user1@email.com",
  items: [orderItem1],
  total: 1,
  status: OrderStatus.SHOPPING,
  lastUpdated: date
};
export const invenDetail1: InventoryDetails = {
  id: uuid(),
  name: "detailname",
  quantity: 3,
  unitPrice: 3,
  description: "new desc",
  lastUpdated: date,
  active: true
};
export const orderDetail1: OrderDetails = {
  id: uuid(),
  email: "test",
  total: 0,
  lastUpdated: date,
  items: [],
  status: OrderStatus.SHOPPING
};
