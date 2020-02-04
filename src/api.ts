import { Route } from "./infra/Route";
import { routes } from "./routes/routes";
import * as mongoose from "mongoose";
import { RequestType } from "./utils/enums";
import models from "./models";
import { InventoryDoc, InventoryDetails, Inventory } from "./models/inventory";
import { OrderDoc, OrderDetails } from "./models/order";

export default class TreezApi {
  // Start API by declaring DBUrl for the API to be connected to.
  private readonly DBUrl: string;

  constructor(DBUrl: string) {
    this.DBUrl = DBUrl;

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

    // For Debug
    // mongoose.set('debug', true);
  }

  public async get(reqType: RequestType, id?: string): Promise<any> {
    let payload: any;

    if (reqType == RequestType.INVENTORY) {
      const inventories: InventoryDoc[] = await models.Inventory.find(
        id ? { id } : {}
      );
      payload = inventories;
    } else {
      const orders: OrderDoc[] = await models.Order.find(id ? { id } : {});
      payload = orders;
    }

    return payload;
  }

  public async update(
    reqType: RequestType,
    details: any,
    upsert: boolean
  ): Promise<any> {
    let payload: any;
    const { id } = details;
    if (reqType == RequestType.INVENTORY) {
      const { name, description, price, quantity } = details;
      const inven = await models.Inventory.findOneAndUpdate(
        { id },
        { name, description, price, quantity },
        upsert ? { upsert: true, new: true } : { new: true }
      ).catch(e => {
        throw new Error(
          `Could not ${upsert ? "Create" : "Update"} Inventory ${id} : ${
            e.message
          }`
        );
      });
      payload = inven;
    } else {
      const { email, orderDate, status } = details;
      const order = await models.Order.findOneAndUpdate(
        { id },
        { email, orderDate, status },
        upsert ? { upsert: true, new: true } : { new: true }
      ).catch(e => {
        throw new Error(
          `Could not ${upsert ? "Create" : "Update"} Order ${id} : ${e.message}`
        );
      });
      payload = order;
    }
    return payload;
  }

  public async delete(reqType: RequestType, id: string): Promise<string> {
    if (reqType == RequestType.INVENTORY) {
      await models.Inventory.findOneAndDelete({ id }).catch(e => {
        throw new Error(`Could not Delete Inventory ${id} ${e.message}`);
      });
    } else {
      await models.Order.findOneAndDelete({ id }).catch(e => {
        throw new Error(`Could not Delete Order ${id} ${e.message}`);
      });
    }
    return id;
  }
}
