import { InventoryController } from "./inventoryController";
import { OrderController } from "./orderController";
declare const controllers: {
    InventoryController: typeof InventoryController;
    OrderController: typeof OrderController;
};
export { OrderController };
export { InventoryController };
export default controllers;
