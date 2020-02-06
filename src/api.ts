import * as mongoose from "mongoose";
import { InventoryDoc, Inventory } from "./models/inventory";
import { OrderDoc, Order } from "./models/order";
import { InventoryController, OrderController } from "./controllers";
import { RequestType } from "./utils/enums";
import { routes } from "./routes/routes";

// Main TreezAPI
export default class TreezApi {
  private readonly DBUrl: string;
  private readonly inventoryController: InventoryController;
  private readonly orderController: OrderController;

  // Start API by declaring DBUrl for the API to be connected to.
  constructor(DBUrl: string) {
    this.DBUrl = DBUrl;

    // Initialize Controllers that handle low level logic
    this.inventoryController = new InventoryController();
    this.orderController = new OrderController();

    // Initialize and Connect to MongoDB from the provided URL
    const db: mongoose.Connection = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () =>
      console.log(`Successfully Connected to mongodb database ${db.name}`)
    );
    mongoose.connect(this.DBUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });

    // Uncomment For Debug
    // mongoose.set('debug', true);
  }

  public getRoutes() {
    return routes(this.inventoryController, this.orderController);
  }
}
