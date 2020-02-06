"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const controllers_1 = require("./controllers");
const routes_1 = require("./routes/routes");
// Main TreezAPI
class TreezApi {
    // Start API by declaring DBUrl for the API to be connected to.
    constructor(DBUrl) {
        this.DBUrl = DBUrl;
        // Initialize Controllers that handle low level logic
        this.inventoryController = new controllers_1.InventoryController();
        this.orderController = new controllers_1.OrderController();
        // Initialize and Connect to MongoDB from the provided URL
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", () => console.log(`Successfully Connected to mongodb database ${db.name}`));
        mongoose.connect(this.DBUrl, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
        // Uncomment For Debug
        // mongoose.set('debug', true);
    }
    getRoutes() {
        return routes_1.routes(this.inventoryController, this.orderController);
    }
}
exports.default = TreezApi;
//# sourceMappingURL=api.js.map