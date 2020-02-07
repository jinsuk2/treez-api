"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const uuid_1 = require("uuid");
const handlers = require("../../infra/MongoHandlers");
const controllers_1 = require("../../controllers");
const fixtures_1 = require("../fixtures");
const models_1 = require("../../models");
let getInventoryMock;
let deleteInventoryMock;
let inventoryFindOneAndUpdateMock;
let emptyInventoryMock;
let id;
let inventoryController = new controllers_1.InventoryController();
beforeEach(async () => {
    // hide log messages
    console.log = jest.fn();
    id = uuid_1.v4();
    getInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([
        fixtures_1.item1
    ]);
    deleteInventoryMock = await sinon_1.stub(handlers, "deleteInventory").resolves("deleted");
    inventoryFindOneAndUpdateMock = await sinon_1.stub(models_1.Inventory, "findOneAndUpdate").resolves(fixtures_1.item3);
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
            const payload = await inventoryController.editInventoryProcesser(id, "name", "desc", 2, 2);
            expect(payload).toEqual({
                id,
                name: "name",
                description: "desc",
                unitPrice: 2,
                quantity: 2,
                active: fixtures_1.item1.active,
                lastUpdated: payload.lastUpdated
            });
            expect(getInventoryMock.callCount).toEqual(1);
        });
        it("Should Not Return if Inventory not found in db", async () => {
            await getInventoryMock.restore();
            emptyInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([]);
            async function mockFunction() {
                await inventoryController.editInventoryProcesser(id, "name", "desc", 1, 1);
            }
            await expect(mockFunction()).rejects.toThrow(new Error(`No Inventory Found for ID: ${id}`));
            await emptyInventoryMock.restore();
        });
        it("Should not update if name, description are empty", async () => {
            const payload = await inventoryController.editInventoryProcesser(id, "", "", 1, 1);
            expect(payload).toEqual({
                id,
                name: fixtures_1.item1.name,
                description: fixtures_1.item1.description,
                unitPrice: 1,
                quantity: 1,
                active: fixtures_1.item1.active,
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
            expect(payload).toEqual(fixtures_1.item3);
        });
        it("Should throw error if no item: case 1: Hard Delete", async () => {
            await getInventoryMock.restore();
            emptyInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([]);
            async function mockFunction() {
                await inventoryController.deleteItem(id, true);
            }
            await expect(mockFunction()).rejects.toThrow(new Error(`No Inventory Found for ID: ${id}`));
            await emptyInventoryMock.restore();
        });
        it("Should throw error if no item: case 2: Soft Delete", async () => {
            await getInventoryMock.restore();
            emptyInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([]);
            async function mockFunction() {
                await inventoryController.deleteItem(id, false);
            }
            await expect(mockFunction()).rejects.toThrow(new Error(`No Inventory Found for ID: ${id}`));
            await emptyInventoryMock.restore();
        });
        it("Should throw error if item already deleted (Soft)", async () => {
            await getInventoryMock.restore();
            emptyInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([
                fixtures_1.item3
            ]);
            async function mockFunction() {
                await inventoryController.deleteItem(id, false);
            }
            await expect(mockFunction()).rejects.toThrow(new Error(`Inventory Item already Deleted`));
            await emptyInventoryMock.restore();
        });
    });
    describe("restoreInventory#", () => {
        it("Should return a payload to Restore item", async () => {
            await getInventoryMock.restore();
            emptyInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([
                fixtures_1.item3
            ]);
            let payload = await inventoryController.restoreInventory(id);
            expect(emptyInventoryMock.callCount).toEqual(1);
            expect(emptyInventoryMock.getCall(0).args).toEqual([id]);
            expect(payload).toEqual({
                id,
                name: fixtures_1.item3.name,
                quantity: fixtures_1.item3.quantity,
                unitPrice: fixtures_1.item3.unitPrice,
                lastUpdated: payload.lastUpdated,
                description: fixtures_1.item3.description,
                active: true
            });
            await emptyInventoryMock.restore();
        });
        it("Should throw error if no item", async () => {
            await getInventoryMock.restore();
            emptyInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([]);
            async function mockFunction() {
                await inventoryController.restoreInventory(id);
            }
            await expect(mockFunction()).rejects.toThrow(new Error(`No Inventory Found for ID: ${id}`));
            await emptyInventoryMock.restore();
        });
        it("Should throw error if item already restored", async () => {
            await getInventoryMock.restore();
            emptyInventoryMock = await sinon_1.stub(handlers, "getInventory").resolves([
                fixtures_1.item1
            ]);
            async function mockFunction() {
                await inventoryController.restoreInventory(id);
            }
            await expect(mockFunction()).rejects.toThrow(new Error(`Inventory Item already Restored`));
            await emptyInventoryMock.restore();
        });
    });
});
//# sourceMappingURL=inventoryController_test.js.map