import { stub, mock } from "sinon";
import { v4 as uuid } from "uuid";
import * as handlers from "../../infra/MongoHandlers";
import { InventoryController } from "../../controllers";

let getInventoryMock: any;

let inventoryController: InventoryController = new InventoryController();
beforeEach(async () => {
  getInventoryMock = await stub(handlers, "getInventory").resolves([
    { active: true, lastUpdated: new Date().toISOString() } as any
  ]);
});

afterEach(async () => {
  await getInventoryMock.restore();
});

describe("InventoryController", () => {
  it("Should return a payload for Inventory", async () => {
    const payload = await inventoryController.editInventoryProcesser(
      "id",
      "name",
      "desc",
      1,
      1
    );
    expect(payload).toEqual({
      id: "id",
      name: "name",
      description: "desc",
      unitPrice: 1,
      quantity: 1,
      active: true,
      lastUpdated: payload.lastUpdated
    });
    expect(getInventoryMock.callCount).toEqual(1);
  });
  it("Should Not Return if Inventory not found in db", async () => {
    await getInventoryMock.restore();
    const emptyInventoryMock = await stub(handlers, "getInventory").resolves(
      []
    );
    async function mockSesh() {
      await inventoryController.editInventoryProcesser(
        "id",
        "name",
        "desc",
        1,
        1
      );
    }
    await expect(mockSesh()).rejects.toThrow(
      new Error("No Inventory Found for ID: id")
    );
    await emptyInventoryMock.restore();
  });
});
