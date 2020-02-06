import { Route } from "../infra/Route";
import { InventoryController, OrderController } from "../controllers";
export declare const routes: (inventoryController: InventoryController, orderController: OrderController) => Route[];
