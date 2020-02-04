"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const enums_1 = require("./utils/enums");
const models_1 = require("./models");
class TreezApi {
    constructor(DBUrl) {
        this.DBUrl = DBUrl;
        // Initialize and Connect to MongoDB from the provided URL
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", () => console.log(`Successfully Connected to mongodb database ${db.name}`));
        mongoose.connect(this.DBUrl, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
        // For Debug
        // mongoose.set('debug', true);
    }
    async get(reqType, id) {
        let payload;
        if (reqType == enums_1.RequestType.INVENTORY) {
            const inventories = await models_1.default.Inventory.find(id ? { id } : {});
            payload = inventories;
        }
        else {
            const orders = await models_1.default.Order.find(id ? { id } : {});
            payload = orders;
        }
        return payload;
    }
    async update(reqType, details, upsert) {
        let payload;
        const { id } = details;
        if (reqType == enums_1.RequestType.INVENTORY) {
            const { name, description, price, quantity } = details;
            const inven = await models_1.default.Inventory.findOneAndUpdate({ id }, { name, description, price, quantity }, upsert ? { upsert: true, new: true } : { new: true }).catch(e => {
                throw new Error(`Could not ${upsert ? "Create" : "Update"} Inventory ${id} : ${e.message}`);
            });
            payload = inven;
        }
        else {
            const { email, orderDate, status } = details;
            const order = await models_1.default.Order.findOneAndUpdate({ id }, { email, orderDate, status }, upsert ? { upsert: true, new: true } : { new: true }).catch(e => {
                throw new Error(`Could not ${upsert ? "Create" : "Update"} Order ${id} : ${e.message}`);
            });
            payload = order;
        }
        return payload;
    }
    async delete(reqType, id) {
        if (reqType == enums_1.RequestType.INVENTORY) {
            await models_1.default.Inventory.findOneAndDelete({ id }).catch(e => {
                throw new Error(`Could not Delete Inventory ${id} ${e.message}`);
            });
        }
        else {
            await models_1.default.Order.findOneAndDelete({ id }).catch(e => {
                throw new Error(`Could not Delete Order ${id} ${e.message}`);
            });
        }
        return id;
    }
}
exports.default = TreezApi;
//# sourceMappingURL=api.js.map