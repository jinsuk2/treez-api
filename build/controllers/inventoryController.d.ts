import { InventoryDetails } from "../models/inventory";
export declare class InventoryController {
    editInventory(id: string, name: string, description: string, unitPrice: number, quantity: number): Promise<InventoryDetails>;
    deleteItem(id: string, hardDelete: boolean): Promise<InventoryDetails | string>;
    restoreInventory(id: string): Promise<InventoryDetails>;
    private emptyGuard;
    private updateQuantity;
}
