import { Route } from "../infra/Route";
import { Request, Response } from "express";
import TreezApi from "../api";
import { RequestType } from "../utils/enums";
import { OrderDetails, OrderDoc, OrderProps } from "../models/order";
import { InventoryDetails, InventoryDoc } from "../models/inventory";

export const routes = (api: TreezApi): Route[] => {
  return [
    new Route("/inventories", "post", [
      async (req: Request, res: Response) => {
        try {
          const payload: InventoryDetails = {
            id: "1",
            name: "name",
            description: "describe",
            price: 1,
            quantity: 2
          };

          const result: InventoryDoc = await api.update(
            RequestType.INVENTORY,
            payload,
            true
          );
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    new Route("/inventories", "get", [
      async (req: Request, res: Response) => {
        try {
          const result: InventoryDoc = await api.get(RequestType.INVENTORY);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    new Route("/inventories/:id", "get", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const result: InventoryDoc = await api.get(RequestType.INVENTORY, id);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    new Route("/inventories/:id", "put", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const payload: InventoryDetails = {
            id: "1",
            name: "name",
            description: "describe",
            price: 1,
            quantity: 2
          };

          const result: InventoryDoc = await api.update(
            RequestType.INVENTORY,
            payload,
            false
          );
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    new Route("/inventories/:id", "delete", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const result: string = await api.delete(RequestType.INVENTORY, id);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    new Route("/orders", "post", [
      async (req: Request, res: Response) => {
        try {
          const payload: OrderDetails = {
            id: "1",
            email: "email",
            orderDate: "date",
            status: "active"
          };

          const result: OrderDoc = await api.update(
            RequestType.ORDER,
            payload,
            true
          );
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    new Route("/orders", "get", [
      async (req: Request, res: Response) => {
        try {
          const result: OrderDoc = await api.get(RequestType.ORDER);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    new Route("/orders/:id", "get", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const result: OrderDoc = await api.get(RequestType.ORDER, id);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    new Route("/orders/:id", "put", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const payload: OrderDetails = {
            id: "1",
            email: "email",
            orderDate: "date",
            status: "active"
          };

          const result: OrderDoc = await api.update(
            RequestType.ORDER,
            payload,
            false
          );
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ]),
    new Route("/orders/:id", "delete", [
      async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const result: string = await api.delete(RequestType.ORDER, id);
          res.status(200).send(result);
        } catch (e) {
          res.status(503).send({ error: e.message });
        }
      }
    ])
  ];
};
