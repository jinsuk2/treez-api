import {
  getInventory,
  deleteInventory,
  updateInventory
} from "../infra/MongoHandlers";
import { InventoryDoc, InventoryDetails, Inventory } from "../models/inventory";
import { emptyGuard } from "../utils/helpers";

export class InventoryController {
  // Main Update Function
  // Handles Changes according to the Params given
  public async editInventoryProcesser(
    id: string,
    name: string,
    description: string,
    unitPrice: number,
    quantity: number
  ): Promise<InventoryDetails> {
    const inven: InventoryDoc[] = await getInventory(id);
    // Error Msg for No Match
    if (!emptyGuard(inven)) {
      throw new Error(`No Inventory Found for ID: ${id}`);
    }
    const item: InventoryDoc = inven[0];

    // Generate Payload to Update
    const payload: InventoryDetails = {
      id,
      name: name ? name : item.name,
      description: description ? description : item.description,
      unitPrice,
      quantity,
      active: item.active,
      lastUpdated: new Date().toISOString()
    };
    return payload;
  }

  // delete an inventory Item
  // requires itemId
  public async deleteItem(
    id: string,
    hardDelete: boolean
  ): Promise<InventoryDoc | string> {
    // Hard Delete Option
    if (hardDelete) {
      const inven: InventoryDoc[] = await getInventory(id);

      // Guard for Empty Inventory
      if (!emptyGuard(inven)) {
        throw new Error(`No Inventory Found for Id: ${id}`);
      }

      const { quantity } = inven[0];

      // Warning msg for Non Empty item
      if (quantity > 0) {
        console.warn(`Inventory still has ${quantity} items`);
      }

      return await deleteInventory(id, hardDelete);
    } else {
      // Soft Delete Option
      // Grabs Inventory of Id
      const inven: InventoryDoc[] = await getInventory(id);

      // Guard for Empty Inventory
      if (!emptyGuard(inven)) {
        throw new Error(`No Inventory Found for Id: ${id}`);
      }

      const { name, quantity, description, unitPrice, active } = inven[0];

      if (!active) {
        throw new Error(`Inventory Item already Deleted`);
      }
      // Warning msg for Non Empty item
      if (quantity > 0) {
        console.warn(`Inventory still has ${quantity} items`);
      }

      const result: InventoryDoc = await Inventory.findOneAndUpdate(
        { id: id },
        { active: false },
        { new: true }
      );

      return result;
    }
  }

  // restore an inventory
  // requires itemId
  public async restoreInventory(id: string): Promise<InventoryDetails> {
    // Grabs Inventory of Id
    const inven: InventoryDoc[] = await getInventory(id);

    // Error Msg for No Match
    if (!emptyGuard(inven)) {
      throw new Error(`No Inventory Found for Id: ${id}`);
    }

    const { name, quantity, description, unitPrice, active } = inven[0];

    if (active) {
      throw new Error(`Inventory Item already Restored`);
    }
    // Warning msg for Non Empty item
    if (quantity > 0) {
      console.warn(`Inventory is still has ${quantity} items`);
    }

    // Create Guarded Payload with details
    const payload: InventoryDetails = {
      id,
      name,
      quantity,
      unitPrice,
      lastUpdated: new Date().toISOString(),
      description,
      active: true
    };

    return payload;
  }
}
