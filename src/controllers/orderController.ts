import { OrderDoc, OrderDetails } from "../models/order";
import { InventoryDoc, InventoryDetails, Inventory } from "../models/inventory";
import {
  getOrder,
  updateOrder,
  getInventory,
  updateInventory,
  getInventoryByName
} from "../infra/MongoHandlers";
import { OrderStatus } from "../utils/enums";
import { emptyGuard, updateStock } from "../utils/helpers";

export class OrderController {
  // Validates If Inventory has enough Items
  // For the Order and Update If Client is
  // Finishing the Order.
  public async validateStock(
    newItems: any[],
    curr: number,
    finish: boolean
  ): Promise<number> {
    let total: number = curr;
    // Handle Each Item in the Order ItemList
    const payload = await newItems.map(async item => {
      return await this.createPromise(item, total, finish);
    });
    const result: number = await Promise.all(payload)
      .then(
        async (results: number[]) =>
          await results.reduce((prev: number, curr: number) => prev + curr)
      )
      .catch(e => {
        console.log(e, "last");
        throw new Error(e);
      });
    return result;
  }

  // Called when Client is Finishing The Order
  public async finishOrder(id: string): Promise<any> {
    const order: OrderDoc[] = await getOrder(id);
    // Error Msg for No Match
    if (!emptyGuard(order)) {
      throw new Error(`No Order Found for Id: ${id}`);
    }

    // Generate Payload accordingly
    const date = new Date().toISOString();
    const { email, items, total } = order[0];
    const payload: OrderDetails = {
      id,
      email,
      items,
      status: OrderStatus.APPROVED,
      total,
      lastUpdated: date,
      orderDatePlaced: date
    };

    return payload;
  }

  private async createPromise(item: any, total: number, finish: boolean) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, count } = item;

        // Name or Count cannot be Empty If Items are Provided
        if (!name || (!count && count < 0)) {
          throw new Error(`Missing Name and Count of the Item`);
        }

        const inventory: any = await getInventoryByName(name);
        // Error Msg for Faulty Item in Order ItemList
        if (!inventory) {
          throw new Error(
            `This Item does not exist in Inventory. Name: ${name}`
          );
        }

        const { id, quantity, unitPrice } = inventory;

        // Error Msg if Inventory cannot handle the order
        if (quantity - count < 0) {
          throw new Error(
            `We don't have enough of this item. Try ${quantity} or less. Name: ${name}`
          );
        }

        if (quantity - count == 0) {
          console.warn("This item is now Out-of-Stock");
        }

        total += unitPrice * count;

        // Update the DB for Inventory if Client is finishing the Order
        if (finish) {
          await updateStock(id, quantity - count);
        }
        resolve(total);
      } catch (e) {
        reject(e.message);
      }
    });
  }
}
