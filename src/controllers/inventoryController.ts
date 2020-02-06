import {
  getInventory,
  updateInventory,
  deleteInventory
} from "../infra/MongoHandlers";
import { InventoryDoc, InventoryDetails } from "../models/inventory";

export class InventoryController {
  // Main Update Function
  // Handles Changes according to the Params given
  public async editInventory(
    id: string,
    name: string,
    description: string,
    unitPrice: number,
    quantity: number
  ): Promise<InventoryDetails> {
    const inven: InventoryDoc[] = await getInventory(id);
    if (!this.emptyGuard(inven)) {
      throw new Error(`No Inventory Found for ID: ${id}`);
    }
    const item: InventoryDoc = inven[0];
    const payload: InventoryDetails = {
      id,
      name: name ? name : item.name,
      description: description ? description : item.description,
      unitPrice: unitPrice ? unitPrice : item.unitPrice,
      quantity: quantity
        ? this.updateQuantity(item.quantity, quantity)
        : item.quantity,
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
  ): Promise<InventoryDetails | string> {
    // Hard Delete Option
    if (hardDelete) {
      return await deleteInventory(id, hardDelete).catch(e => {
        throw new Error(
          `Couldn't Delete Inventory ID: ${id}. Message: ${e.message}`
        );
      });
    } else {
      // Grabs Inventory of Id
      const inven: InventoryDoc[] = await getInventory(id);

      // Guard for Empty Inventory
      if (!this.emptyGuard(inven)) {
        throw new Error(`No Inventory Found for Id: ${id}`);
      }

      const { name, quantity, description, unitPrice } = inven[0];

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
        active: false
      };

      return payload;
    }
  }

  // restore an inventory
  // requires itemId
  public async restoreInventory(id: string): Promise<InventoryDetails> {
    // Grabs Inventory of Id
    const inven: InventoryDoc[] = await getInventory(id);

    if (!this.emptyGuard(inven)) {
      throw new Error(`No Inventory Found for Id: ${id}`);
    }

    const { name, quantity, description, unitPrice } = inven[0];

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

  // Guard for empty Inventories
  private emptyGuard = (inven: InventoryDoc[]): boolean => {
    if (!inven || inven.length <= 0) {
      return false;
    } else return true;
  };

  // update quantity of an item
  private updateQuantity(quantity: number, count?: number): number {
    let change: number = count ? count : 0;
    const total = change ? change : quantity + 1;

    return total;
  }
}
