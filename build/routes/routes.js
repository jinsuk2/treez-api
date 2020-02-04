"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = require("../infra/Route");
const enums_1 = require("../utils/enums");
exports.routes = (api) => {
    return [
        new Route_1.Route("/inventories", "post", [
            async (req, res) => {
                try {
                    const payload = {
                        id: "1",
                        name: "name",
                        description: "describe",
                        price: 1,
                        quantity: 2
                    };
                    const result = await api.update(enums_1.RequestType.INVENTORY, payload, true);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        new Route_1.Route("/inventories", "get", [
            async (req, res) => {
                try {
                    const result = await api.get(enums_1.RequestType.INVENTORY);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        new Route_1.Route("/inventories/:id", "get", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    const result = await api.get(enums_1.RequestType.INVENTORY, id);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        new Route_1.Route("/inventories/:id", "put", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    const payload = {
                        id: "1",
                        name: "name",
                        description: "describe",
                        price: 1,
                        quantity: 2
                    };
                    const result = await api.update(enums_1.RequestType.INVENTORY, payload, false);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        new Route_1.Route("/inventories/:id", "delete", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    const result = await api.delete(enums_1.RequestType.INVENTORY, id);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        new Route_1.Route("/orders", "post", [
            async (req, res) => {
                try {
                    const payload = {
                        id: "1",
                        email: "email",
                        orderDate: "date",
                        status: "active"
                    };
                    const result = await api.update(enums_1.RequestType.ORDER, payload, true);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        new Route_1.Route("/orders", "get", [
            async (req, res) => {
                try {
                    const result = await api.get(enums_1.RequestType.ORDER);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        new Route_1.Route("/orders/:id", "get", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    const result = await api.get(enums_1.RequestType.ORDER, id);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        new Route_1.Route("/orders/:id", "put", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    const payload = {
                        id: "1",
                        email: "email",
                        orderDate: "date",
                        status: "active"
                    };
                    const result = await api.update(enums_1.RequestType.ORDER, payload, false);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ]),
        new Route_1.Route("/orders/:id", "delete", [
            async (req, res) => {
                const { id } = req.params;
                try {
                    const result = await api.delete(enums_1.RequestType.ORDER, id);
                    res.status(200).send(result);
                }
                catch (e) {
                    res.status(503).send({ error: e.message });
                }
            }
        ])
    ];
};
//# sourceMappingURL=routes.js.map