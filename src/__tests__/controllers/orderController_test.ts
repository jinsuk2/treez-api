import { stub } from "sinon";
import { v4 as uuid } from "uuid";
import * as handlers from "../../infra/MongoHandlers";
import { OrderController } from "../../controllers";
import { item1, item2, item3, orderItem1, order1 } from "../fixtures";
import { Inventory } from "../../models";
import { OrderStatus } from "../../utils/enums";
import helpers from "../../utils/helpers";

let getOrderMock: any;
let getInventoryByNameMock: any;
let emptyOrderMock: any;
let id: string;

let orderController: OrderController = new OrderController();
beforeEach(async () => {
  // hide log messages
  console.log = jest.fn();
  id = uuid();
  getOrderMock = await stub(handlers, "getOrder").resolves([order1 as any]);
  getInventoryByNameMock = await stub(handlers, "getInventoryByName").resolves(
    item1 as any
  );
});

afterEach(async () => {
  id = "";
  await getOrderMock.restore();
  await getInventoryByNameMock.restore();
});

describe("OrderController", () => {
  describe("finishOrder#", () => {
    it("Should return a payload for Finishing Order", async () => {
      const payload = await orderController.finishOrder(id);
      const date = new Date().toISOString();
      expect(getOrderMock.callCount).toEqual(1);
      await expect(getOrderMock.getCall(0).args).toEqual([id]);
      expect(payload).toEqual({
        id,
        email: order1.email,
        items: order1.items,
        status: OrderStatus.APPROVED,
        total: order1.total,
        lastUpdated: date,
        orderDatePlaced: date
      });
    });
    it("Should Not Return if Inventory not found in db", async () => {
      await getOrderMock.restore();
      emptyOrderMock = await stub(handlers, "getOrder").resolves([]);
      async function mockFunction() {
        await orderController.finishOrder(id);
      }
      await expect(mockFunction()).rejects.toThrow(
        new Error(`No Order Found for ID: ${id}`)
      );
      await emptyOrderMock.restore();
    });
  });
  describe("validateStock#", () => {
    it("Should return a total number for new Total", async () => {
      const number = await orderController.validateStock(
        [{ name: item1.name, count: 1 }],
        0,
        false
      );
      expect(number).toEqual(item1.unitPrice * 1);
    });
    it("Should throw error for missing name / count", async () => {
      async function noCount() {
        await orderController.validateStock([{ name: "" }], 1, false);
      }
      await expect(noCount()).rejects.toThrowError(
        "Missing Name or Count of the Item"
      );
      async function noName() {
        await orderController.validateStock([{ count: 1 }], 1, false);
      }
      await expect(noName()).rejects.toThrowError(
        "Missing Name or Count of the Item"
      );
    });
  });
});
