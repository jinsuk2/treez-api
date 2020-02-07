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
  deleteOrder,
  updateOrder,
  getInventoryByName
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
          // Name cannot be empty
          if (!name) {
            throw new Error(`Name cannot be undefined for a new Item.`);
          }

          // Check if an Item with same name already exists.
          const check: InventoryDoc = await getInventoryByName(name);
          if (!check) {
            throw new Error(`There already is an Item Named ${name}`);
          }

          // Generate Parameter to Create Inventory Item
          const payload: InventoryDetails = {
            id: uuid(),
            name,
            description,
            quantity,
            unitPrice,
            active: true,
            lastUpdated: new Date().toISOString()
          };

          // Update DB and send result to Client
          const inven: InventoryDoc = await createInventory(payload);
          res.status(200).send({
            success: "Successfully Created Inventory Item!",
            data: inven
          });
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

          // An Error Msg for Empty DB Collection Cases.
          if (result.length <= 0) {
            throw new Error(`There is nothing in the Inventory`);
          }

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

          // An Error Msg for No Match
          if (result.length <= 0) {
            throw new Error(`There is no Item with ID: ${id}`);
          }

          res.status(200).send(result);
        } catch (e) {
          console.log(e);
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Update Inventory Item
    new Route("/inventories/:id", "put", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name = "", description = "", quantity, unitPrice } = req.body;
        try {
          // Check if Item exists in DB
          const check: InventoryDoc[] = await getInventory(id);
          if (check.length != 1) {
            throw new Error(`There is no Item with ID: ${id}`);
          }

          // Update or keep Original Info IF not provided.
          let count: number = check[0].quantity;
          let newPrice: number = check[0].unitPrice;
          if (quantity || quantity == 0) {
            count = quantity;
          }
          if (unitPrice || unitPrice == 0) {
            newPrice = unitPrice;
          }

          // Generate parameters to Update Inventory Item
          const payload: InventoryDetails = await inventoryController.editInventoryProcesser(
            id,
            name,
            description,
            newPrice,
            count
          );

          // Update DB and send result to client
          const result: InventoryDoc = await updateInventory(id, payload);
          res.status(200).send({
            success: "Successfully Updated Inventory Item!",
            data: result
          });
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Delete Inventory
    new Route("/inventories/:id", "delete", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        // Secret Parameter for Soft Deleting Items
        const { soft = false } = req.body;
        try {
          // Handles both Hard and Soft Delete
          // Update DB Accordingly
          const result = await inventoryController.deleteItem(
            id,
            soft ? false : true
          );
          res.status(200).send({
            success: "Successfully Deleted Inventory Item!",
            data: soft ? result : null
          });
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
          // Restore a Soft Deleted Item
          const payload: InventoryDetails = await inventoryController.restoreInventory(
            id
          );
          const result = await updateInventory(id, payload);
          res.status(200).send({
            success: "Successfully Restored Inventory Item!",
            data: result
          });
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Create New Order
    new Route("/orders", "post", [
      async (req: Request, res: Response) => {
        const { email, items = [], finish = false } = req.body;
        let total: number = 0;
        try {
          // Email cannot be empty
          if (!email) {
            throw new Error(`Email cannot be undefined for a new Order.`);
          }
          // Update Total and Inventory stock
          if (items.length > 0) {
            total = await orderController.validateStock(items, total, finish);
          }
          // Generate Parameter to Create new Order
          const payload: OrderDetails = {
            id: uuid(),
            email,
            status: finish ? OrderStatus.APPROVED : OrderStatus.SHOPPING,
            items,
            total: total,
            lastUpdated: new Date().toISOString()
          };

          // Update DB and Send
          const result: OrderDoc = await createOrder(payload);
          res.status(200).send({
            success: "Successfully Created new Order!",
            data: result
          });
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
          // Error Msg for Empty DB Collection
          if (result.length <= 0) {
            throw new Error(`There are No Active Orders`);
          }
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
          // Error Msg for No Match
          if (result.length <= 0) {
            throw new Error(`There is no Order with ID: ${id}`);
          }
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    // Update Order
    new Route("/orders/:id", "put", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        const { email = "", finish = false, items = [] } = req.body;
        try {
          let total: number = 0;
          let order: OrderDoc;

          const orderList: OrderDoc[] = await getOrder(id);

          // Error Msg for No Match
          if (orderList.length <= 0) {
            throw new Error(`There is not such Order. ID: ${id}`);
          }

          order = orderList[0];

          // Warning msg for Editing Order already Approved
          if (order.status == OrderStatus.APPROVED) {
            console.warn("This Order is Already Approved");
          }

          // Handle Items Change and Update Inventory Stock
          if (items.length > 0) {
            total = await orderController.validateStock(items, total, finish);
          }

          // Generate Parameters for Update Order
          const payload: OrderDetails = {
            id,
            email: email ? email : order.email,
            status: finish ? OrderStatus.APPROVED : OrderStatus.SHOPPING,
            items: items,
            total,
            lastUpdated: new Date().toISOString()
          };

          // Update Db and Send
          const result = await updateOrder(id, payload);
          res.status(200).send({
            success: "Successfully Updated Order!",
            data: result
          });
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
          res.status(200).send({
            success: "Successfully Deleted Order!",
            data: result
          });
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ])
  ];
};
