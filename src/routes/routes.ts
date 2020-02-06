import { Route } from "../infra/Route";
import { Request, Response } from "express";
import * as uuid from "uuid/v4";
import { RequestType, OrderStatus } from "../utils/enums";
import { OrderDetails, OrderDoc } from "../models/order";
import { InventoryDetails, InventoryDoc } from "../models/inventory";
import {
  createInventory,
  getInventory,
  updateInventory,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} from "../infra/MongoHandlers";
import { InventoryController, OrderController } from "../controllers";

export const routes = (
  inventoryController: InventoryController,
  orderController: OrderController
): Route[] => {
  return [
    // Create New Inventory Item
    new Route("/inventories", "post", [
      async (req: Request, res: Response) => {
        const { name, description, quantity, unitPrice } = req.body;
        try {
          const check: InventoryDoc[] = await getInventory(null, name);
          if (check.length > 0) {
            res.status(404).send(`There already is an Item Named ${name}`);
            return;
          }
          const payload: InventoryDetails = {
            id: uuid(),
            name,
            description,
            quantity,
            unitPrice,
            active: true,
            lastUpdated: new Date().toISOString()
          };
          const inven: InventoryDoc = await createInventory(payload);
          res.status(200).send(inven);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Get All Inventory Items
    new Route("/inventories", "get", [
      async (req: Request, res: Response) => {
        try {
          const result: InventoryDoc[] = await getInventory();
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Get Inventory Item by Id
    new Route("/inventories/:id", "get", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const result: InventoryDoc[] = await getInventory(id);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Update Inventory Item
    new Route("/inventories/:id", "put", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const {
          name = "",
          description = "",
          quantity = 0,
          unitPrice = 0
        } = req.body;
        try {
          let payload: InventoryDetails;
          const check: InventoryDoc[] = await getInventory(id);

          if (check.length != 1) {
            res.status(404).send(`There is no Item Named ${name}`);
            return;
          }

          payload = await inventoryController.editInventory(
            id,
            name,
            description,
            unitPrice,
            quantity
          );
          const result: InventoryDoc = await updateInventory(id, payload);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Delete Inventory
    new Route("/inventories/:id", "delete", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const { hard } = req.body;
        try {
          const result = await inventoryController.deleteItem(
            id,
            hard ? true : false
          );
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Restore Inventory
    new Route("/inventories/restore/:id", "put", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const result: InventoryDetails = await inventoryController.restoreInventory(
            id
          );
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Create New Order
    new Route("/orders", "post", [
      async (req: Request, res: Response) => {
        const { email } = req.body;
        try {
          const payload: OrderDetails = {
            id: uuid(),
            email,
            status: OrderStatus.SHOPPING,
            items: [],
            total: 0
          };
          const result: OrderDoc = await createOrder(payload);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Get All Orders
    new Route("/orders", "get", [
      async (req: Request, res: Response) => {
        try {
          const result: OrderDoc[] = await getOrder();
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Get Order by Id
    new Route("/orders/:id", "get", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const result: OrderDoc[] = await getOrder(id);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Update Order
    new Route("/orders/:id/:itemId", "put", [
      async (req: Request, res: Response) => {
        const { id, itemId } = req.params;
        const {
          email = "",
          status = "",
          items = [],
          total = 0,
          count = 0
        } = req.body;
        try {
          let payload = await orderController.updateOrderItems(
            id,
            itemId,
            count
          );
          console.log(payload);
          const result: OrderDoc = await updateOrder(id, payload.payload);
          const tmp: InventoryDoc = await updateInventory(
            itemId,
            payload.inventoryPayload
          );
          console.log(tmp, result);
          res.status(200).send({ result, tmp });
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Delete Order
    new Route("/orders/:id", "delete", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const result: string = await deleteOrder(id);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ])
  ];
};
