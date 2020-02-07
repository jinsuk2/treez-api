import { stub } from "sinon";
import { v4 as uuid } from "uuid";
import * as handlers from "../../infra/MongoHandlers";
import { InventoryController } from "../../controllers";
import { item1, item2, item3 } from "../fixtures";
import { Inventory } from "../../models";

let getInventoryMock: any;
let deleteInventoryMock: any;
let inventoryFindOneAndUpdateMock: any;
let emptyInventoryMock: any;
let id: string;

let inventoryController: InventoryController = new InventoryController();
beforeEach(async () => {
  // hide log messages
  console.log = jest.fn();
  id = uuid();
  getInventoryMock = await stub(handlers, "getInventory").resolves([
    item1 as any
  ]);
  deleteInventoryMock = await stub(handlers, "deleteInventory").resolves(
    "deleted"
  );
  inventoryFindOneAndUpdateMock = await stub(
    Inventory,
    "findOneAndUpdate"
  ).resolves(item3 as any);
});

afterEach(async () => {
  id = "";
  await getInventoryMock.restore();
  await deleteInventoryMock.restore();
  await inventoryFindOneAndUpdateMock.restore();
});

describe("InventoryController", () => {
  describe("editInventoryProcesser#", () => {
    it("Should return a payload for Inventory", async () => {
      const payload = await inventoryController.editInventoryProcesser(
        id,
        "name",
        "desc",
        2,
        2
      );
      expect(payload).toEqual({
        id,
        name: "name",
        description: "desc",
        unitPrice: 2,
        quantity: 2,
        active: item1.active,
        lastUpdated: payload.lastUpdated
      });
      expect(getInventoryMock.callCount).toEqual(1);
    });
    it("Should Not Return if Inventory not found in db", async () => {
      await getInventoryMock.restore();
      emptyInventoryMock = await stub(handlers, "getInventory").resolves([]);
      async function mockFunction() {
        await inventoryController.editInventoryProcesser(
          id,
          "name",
          "desc",
          1,
          1
        );
      }
      await expect(mockFunction()).rejects.toThrow(
        new Error(`No Inventory Found for ID: ${id}`)
      );
      await emptyInventoryMock.restore();
    });
    it("Should not update if name, description are empty", async () => {
      const payload = await inventoryController.editInventoryProcesser(
        id,
        "",
        "",
        1,
        1
      );
      expect(payload).toEqual({
        id,
        name: item1.name,
        description: item1.description,
        unitPrice: 1,
        quantity: 1,
        active: item1.active,
        lastUpdated: payload.lastUpdated
      });
    });
  });
  describe("deleteItem#", () => {
    it("Should delete an item: case 1: Hard Delete", async () => {
      const payload = await inventoryController.deleteItem(id, true);
      expect(getInventoryMock.callCount).toEqual(1);
      expect(getInventoryMock.getCall(0).args).toEqual([id]);
      expect(deleteInventoryMock.callCount).toEqual(1);
      expect(deleteInventoryMock.getCall(0).args).toEqual([id, true]);
      expect(payload).toEqual("deleted");
    });
    it("Should delete an item: case 2: Soft Delete", async () => {
      const payload = await inventoryController.deleteItem(id, false);
      expect(getInventoryMock.callCount).toEqual(1);
      expect(getInventoryMock.getCall(0).args).toEqual([id]);
      expect(inventoryFindOneAndUpdateMock.callCount).toEqual(1);
      expect(inventoryFindOneAndUpdateMock.getCall(0).args).toEqual([
        { id },
        { active: false },
        { new: true }
      ]);
      expect(payload).toEqual(item3);
    });
    it("Should throw error if no item: case 1: Hard Delete", async () => {
      await getInventoryMock.restore();
      emptyInventoryMock = await stub(handlers, "getInventory").resolves([]);
      async function mockFunction() {
        await inventoryController.deleteItem(id, true);
      }
      await expect(mockFunction()).rejects.toThrow(
        new Error(`No Inventory Found for ID: ${id}`)
      );
      await emptyInventoryMock.restore();
    });
    it("Should throw error if no item: case 2: Soft Delete", async () => {
      await getInventoryMock.restore();
      emptyInventoryMock = await stub(handlers, "getInventory").resolves([]);
      async function mockFunction() {
        await inventoryController.deleteItem(id, false);
      }
      await expect(mockFunction()).rejects.toThrow(
        new Error(`No Inventory Found for ID: ${id}`)
      );
      await emptyInventoryMock.restore();
    });
    it("Should throw error if item already deleted (Soft)", async () => {
      await getInventoryMock.restore();
      emptyInventoryMock = await stub(handlers, "getInventory").resolves([
        item3 as any
      ]);
      async function mockFunction() {
        await inventoryController.deleteItem(id, false);
      }
      await expect(mockFunction()).rejects.toThrow(
        new Error(`Inventory Item already Deleted`)
      );
      await emptyInventoryMock.restore();
    });
  });
  describe("restoreInventory#", () => {
    it("Should return a payload to Restore item", async () => {
      await getInventoryMock.restore();
      emptyInventoryMock = await stub(handlers, "getInventory").resolves([
        item3 as any
      ]);
      let payload = await inventoryController.restoreInventory(id);
      expect(emptyInventoryMock.callCount).toEqual(1);
      expect(emptyInventoryMock.getCall(0).args).toEqual([id]);
      expect(payload).toEqual({
        id,
        name: item3.name,
        quantity: item3.quantity,
        unitPrice: item3.unitPrice,
        lastUpdated: payload.lastUpdated,
        description: item3.description,
        active: true
      });
      await emptyInventoryMock.restore();
    });
    it("Should throw error if no item", async () => {
      await getInventoryMock.restore();
      emptyInventoryMock = await stub(handlers, "getInventory").resolves([]);
      async function mockFunction() {
        await inventoryController.restoreInventory(id);
      }
      await expect(mockFunction()).rejects.toThrow(
        new Error(`No Inventory Found for ID: ${id}`)
      );
      await emptyInventoryMock.restore();
    });
    it("Should throw error if item already restored", async () => {
      await getInventoryMock.restore();
      emptyInventoryMock = await stub(handlers, "getInventory").resolves([
        item1 as any
      ]);
      async function mockFunction() {
        await inventoryController.restoreInventory(id);
      }
      await expect(mockFunction()).rejects.toThrow(
        new Error(`Inventory Item already Restored`)
      );
      await emptyInventoryMock.restore();
    });
  });
});
