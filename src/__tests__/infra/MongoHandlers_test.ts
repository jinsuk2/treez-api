import { stub, SinonStub } from "sinon";
import { v4 as uuid } from "uuid";
import { Inventory, Order } from "../../models";
import {
  getInventory,
  getInventoryByName,
  updateInventory,
  createInventory,
  deleteInventory,
  getOrder,
  updateOrder,
  createOrder,
  deleteOrder
} from "../../infra/MongoHandlers";
import {
  item1,
  item2,
  item3,
  invenDetail1,
  order1,
  orderDetail1
} from "../fixtures";

let id: string;
let mocker: SinonStub;
beforeEach(async () => {
  id = uuid();
});

afterEach(async () => {
  id = "";
  await mocker.restore();
});

describe("MongoHandlers", () => {
  describe("Inventory#", () => {
    it("should get Inventory by Id or All", async () => {
      mocker = await stub(Inventory, "find").resolves([]);
      const payload = await getInventory(id);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([{ id }]);
      expect(payload).toEqual([]);
      await mocker.restore();
      mocker = await stub(Inventory, "find").resolves([
        item2 as any,
        item3 as any
      ]);
      const payload2 = await getInventory();
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([{}]);
      expect(payload2).toEqual([item2, item3]);
    });
    it("Should get Inventory by Name", async () => {
      mocker = await stub(Inventory, "findOne").resolves(item1 as any);
      const payload = await getInventoryByName(item1.name);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([{ name: item1.name }]);
      expect(payload).toEqual(item1);
    });
    it("Should update Inventory", async () => {
      mocker = await stub(Inventory, "findOneAndUpdate").resolves(item1 as any);
      const payload = await updateInventory(item1.id, invenDetail1);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([
        { id: item1.id },
        invenDetail1,
        { new: true }
      ]);
      expect(payload).toEqual(item1);
    });
    it("Should create Inventory", async () => {
      mocker = await stub(Inventory, "create").resolves(item1 as any);
      const payload = await createInventory(invenDetail1);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([invenDetail1]);
      expect(payload).toEqual(item1);
    });
    it("Should delete Inventory", async () => {
      // hard Delete
      mocker = await stub(Inventory, "deleteOne").resolves(null);
      let findMock = await stub(Inventory, "findOne").resolves(item1 as any);
      const payload = await deleteInventory(item1.id, true);
      expect(findMock.getCall(0).args).toEqual([{ id: item1.id }]);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([{ id: item1.id }]);
      expect(payload).toEqual(item1.id);
      await mocker.restore();

      // soft Delete
      mocker = await stub(Inventory, "findOneAndUpdate").resolves(null);
      const payload2 = await deleteInventory(item1.id, false);
      expect(findMock.getCall(1).args).toEqual([{ id: item1.id }]);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([
        { id: item1.id },
        { active: false }
      ]);
      expect(payload2).toEqual(item1.id);
      await findMock.restore();
      await mocker.restore();

      findMock = await stub(Inventory, "findOne").resolves(null);
      async function temp() {
        await deleteInventory(item1.id, false);
      }
      await expect(temp()).rejects.toThrowError(
        `Inventory with ${item1.id} doesn't exist!`
      );
      await findMock.restore();
    });
  });
  describe("Order#", () => {
    it("Should Get Order", async () => {
      mocker = await stub(Order, "find").resolves([]);
      const payload = await getOrder(id);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([{ id }]);
      expect(payload).toEqual([]);
      await mocker.restore();
      mocker = await stub(Order, "find").resolves([item2 as any, item3 as any]);
      const payload2 = await getOrder();
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([{}]);
      expect(payload2).toEqual([item2, item3]);
    });
    it("Should update Order", async () => {
      mocker = await stub(Order, "findOneAndUpdate").resolves(order1 as any);
      const payload = await updateOrder(item1.id, orderDetail1);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([
        { id: item1.id },
        orderDetail1,
        { new: true }
      ]);
      expect(payload).toEqual(order1);
    });
    it("Should create Order", async () => {
      mocker = await stub(Order, "create").resolves(order1 as any);
      const payload = await createOrder(orderDetail1);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([orderDetail1]);
      expect(payload).toEqual(order1);
    });
    it("Should delete Order", async () => {
      let findMock = await stub(Order, "findOne").resolves(order1 as any);
      mocker = await stub(Order, "deleteOne").resolves(null);
      const payload = await deleteOrder(order1.id);
      expect(mocker.callCount).toEqual(1);
      expect(mocker.getCall(0).args).toEqual([{ id: order1.id }]);
      expect(findMock.getCall(0).args).toEqual([order1.id]);
      expect(payload).toEqual(order1.id);
      await findMock.restore();
      await mocker.restore();
      findMock = await stub(Order, "findOne").resolves(null);
      async function temp() {
        await deleteOrder(order1.id);
      }
      await expect(temp()).rejects.toThrowError(
        `Order doesn't exist. ID: ${order1.id}`
      );
      await findMock.restore();
    });
  });
});
