import { Inventory } from "../models";

// Guard for empty Inventories / Orders
export const emptyGuard = (order: any[]): boolean => {
  if (!order || order.length <= 0) {
    return false;
  } else return true;
};

// Helper for Updating Inven Stock
export const updateStock = async (id: string, count: number) => {
  await Inventory.findOneAndUpdate(
    { id: id },
    {
      quantity: count,
      lastUpdated: new Date().toISOString()
    }
  );
};

const helpers = {
  emptyGuard,
  updateStock
};
export default helpers;
