"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const handlers = require("../../infra/MongoHandlers");
const controllers_1 = require("../../controllers");
let getInventoryMock;
let inventoryController = new controllers_1.InventoryController();
beforeEach(async () => {
    getInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([
        { active: true, lastUpdated: new Date().toISOString() }
    ]);
});
afterEach(async () => {
    await getInventoryMock.restore();
});
describe("InventoryController", () => {
    it("Should return a payload for Inventory", async () => {
        const payload = await inventoryController.editInventoryProcesser("id", "name", "desc", 1, 1);
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
        const emptyInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([]);
        async function mockSesh() {
            await inventoryController.editInventoryProcesser("id", "name", "desc", 1, 1);
        }
        await expect(mockSesh()).rejects.toThrow(new Error("No Inventory Found for ID: id"));
        await emptyInventoryMock.restore();
    });
});
//# sourceMappingURL=inventoryController_test.js.map