import { Inventory, Order } from "../models";
import * as uuid from "uuid/v4";
import { InventoryDetails, InventoryDoc } from "../models/inventory";
import { OrderDetails, OrderDoc } from "../models/order";

// Collection of CRUD functions for Easy Referencing
// Inventory
export const getInventory = async (id?: string): Promise<InventoryDoc[]> => {
  return await Inventory.find(id ? { id: id } : {});
};

export const getInventoryByName = async (
  name: string
): Promise<InventoryDoc> => {
  return await Inventory.findOne({ name: name });
};

export const updateInventory = async (
  id: string,
  updateBody: InventoryDetails
): Promise<InventoryDoc> => {
  return await Inventory.findOneAndUpdate({ id: id }, updateBody, {
    new: true
  });
};

export const createInventory = async (
  updateBody: InventoryDetails
): Promise<InventoryDoc> => {
  return await Inventory.create(updateBody);
};

export const deleteInventory = async (
  id: string,
  hardDelete?: boolean
): Promise<string> => {
  if (!(await Inventory.findOne({ id: id }))) {
    throw new Error(`Inventory with ${id} doesn't exist!`);
  }
  if (hardDelete) {
    await Inventory.deleteOne({ id: id }).catch(e => {
      throw new Error(`Could not Delete Inventory ${id} error: ${e.message}`);
    });
  } else
    await Inventory.findOneAndUpdate({ id: id }, { active: false }).catch(e => {
      throw new Error(`Could not Delete Inventory ${id} error: ${e.message}`);
    });
  return id;
};

// Order
export const getOrder = async (id?: string): Promise<OrderDoc[]> => {
  return await Order.find(id ? { id: id } : {});
};

export const updateOrder = async (
  id: string,
  updateBody: OrderDetails
): Promise<OrderDoc> => {
  return await Order.findOneAndUpdate({ id: id }, updateBody, { new: true });
};

export const createOrder = async (updateBody: OrderDetails) => {
  return await Order.create(updateBody);
};

export const deleteOrder = async (id: string) => {
  if (!(await Order.findOne(id))) {
    throw new Error(`Order doesn't exist. ID: ${id}`);
  }
  await Order.deleteOne({ id: id }).catch(e => {
    throw new Error(`Could not Delete Order ${id}`);
  });
  return id;
};

const handlers = {
  getInventory,
  getInventoryByName,
  updateInventory,
  createInventory,
  deleteInventory,
  getOrder,
  updateOrder,
  createOrder,
  deleteOrder
};

export default handlers;
