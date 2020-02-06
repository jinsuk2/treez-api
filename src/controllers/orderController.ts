import { OrderDoc, OrderDetails } from "../models/order";
import { InventoryDoc, InventoryDetails } from "../models/inventory";
import {
  getOrder,
  updateOrder,
  getInventory,
  updateInventory
} from "../infra/MongoHandlers";
import { OrderStatus } from "../utils/enums";

export class OrderController {
  // add/remove items from order
  // requires orderId and itemId, Optional: new count
  // NOTE: Default will be increment/decrement
  public async updateOrderItems(
    id: string,
    itemId: string,
    count: number
  ): Promise<any> {
    let tempTotal: number = 0;
    // Grab Order, Item to be updated
    const order: OrderDoc[] = await getOrder(id);
    const item: InventoryDoc[] = await getInventory(itemId);

    // Guard for Order, Item
    if (!this.emptyGuard(order)) {
      throw new Error(`No Order Found for Id: ${id}`);
    } else if (!this.emptyGuard(item)) {
      throw new Error(`No Item Found for Id: ${itemId}`);
    }

    const { email, items, status, total, orderDatePlaced } = order[0];
    const { name, description, active, quantity, unitPrice } = item[0];

    if (quantity - count < 0) {
      throw new Error(
        `We Are Out Of Stock! Try this number: ${quantity - count}`
      );
    }

    let newItems: any[];

    if (count > 0) {
      newItems = items.map(item => {
        if (item.id === itemId) {
          item.count = count;
        } else {
          items.push({ itemId, itemName: name, count });
        }
        tempTotal = count * unitPrice;
      });
    } else if (count < 0) {
      newItems = items.map(item => {
        // TODO Here
        // if (item.id === itemId) {
        //   item.count
        // }
      });
    }

    // Create Guarded Payload with details
    const payload: OrderDetails = {
      id,
      email,
      items: newItems,
      status,
      total: total + tempTotal,
      orderDatePlaced
    };

    const inventoryPayload: InventoryDetails = {
      id: itemId,
      name,
      quantity: quantity - count,
      unitPrice,
      lastUpdated: new Date().toISOString(),
      description,
      active
    };

    return { payload, inventoryPayload };
    // // Update Order with Payload
    // await updateOrder(id, payload).catch(e => {
    //   return `Couldn't update Order ID: ${id} Message: ${e.message}`;
    // });
    // // Update Inventory with the count
    // await updateInventory(itemId, inventoryPayload).catch(e => {
    //   throw new Error(`Couldn't update Item ID: ${id} Message: ${e.message}`);
    // });
    // return `Successfully updated Order ID: ${id} to : ${count}`;
  }

  public async finishOrder(id: string): Promise<any> {
    const order: OrderDoc[] = await getOrder(id);
    if (!this.emptyGuard(order)) {
      throw new Error(`No Order Found for Id: ${id}`);
    }
    const { email, items, status, total } = order[0];
    const payload: OrderDetails = {
      id,
      email,
      items,
      status: OrderStatus.APPROVED,
      total,
      orderDatePlaced: new Date().toISOString()
    };

    return payload;
  }
  // Guard for empty Inventories
  private emptyGuard = (order: any[]): boolean => {
    if (!order || order.length <= 0) {
      return false;
    } else return true;
  };
}
