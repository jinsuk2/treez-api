import { InventoryDoc, InventoryDetails } from "../models/inventory";
export declare class InventoryController {
    editInventoryProcesser(id: string, name: string, description: string, unitPrice: number, quantity: number): Promise<InventoryDetails>;
    deleteItem(id: string, hardDelete: boolean): Promise<InventoryDoc | string>;
    restoreInventory(id: string): Promise<InventoryDetails>;
}
