"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const uuid_1 = require("uuid");
const models_1 = require("../../models");
const MongoHandlers_1 = require("../../infra/MongoHandlers");
const fixtures_1 = require("../fixtures");
let id;
let mocker;
beforeEach(async () => {
    id = uuid_1.v4();
});
afterEach(async () => {
    id = "";
    await mocker.restore();
});
describe("MongoHandlers", () => {
    describe("Inventory#", () => {
        it("should get Inventory by Id or All", async () => {
            mocker = await sinon_1.stub(models_1.Inventory, "find").resolves([]);
            const payload = await MongoHandlers_1.getInventory(id);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([{ id }]);
            expect(payload).toEqual([]);
            await mocker.restore();
            mocker = await sinon_1.stub(models_1.Inventory, "find").resolves([
                fixtures_1.item2,
                fixtures_1.item3
            ]);
            const payload2 = await MongoHandlers_1.getInventory();
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([{}]);
            expect(payload2).toEqual([fixtures_1.item2, fixtures_1.item3]);
        });
        it("Should get Inventory by Name", async () => {
            mocker = await sinon_1.stub(models_1.Inventory, "findOne").resolves(fixtures_1.item1);
            const payload = await MongoHandlers_1.getInventoryByName(fixtures_1.item1.name);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([{ name: fixtures_1.item1.name }]);
            expect(payload).toEqual(fixtures_1.item1);
        });
        it("Should update Inventory", async () => {
            mocker = await sinon_1.stub(models_1.Inventory, "findOneAndUpdate").resolves(fixtures_1.item1);
            const payload = await MongoHandlers_1.updateInventory(fixtures_1.item1.id, fixtures_1.invenDetail1);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([
                { id: fixtures_1.item1.id },
                fixtures_1.invenDetail1,
                { new: true }
            ]);
            expect(payload).toEqual(fixtures_1.item1);
        });
        it("Should create Inventory", async () => {
            mocker = await sinon_1.stub(models_1.Inventory, "create").resolves(fixtures_1.item1);
            const payload = await MongoHandlers_1.createInventory(fixtures_1.invenDetail1);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([fixtures_1.invenDetail1]);
            expect(payload).toEqual(fixtures_1.item1);
        });
        it("Should delete Inventory", async () => {
            // hard Delete
            mocker = await sinon_1.stub(models_1.Inventory, "deleteOne").resolves(null);
            let findMock = await sinon_1.stub(models_1.Inventory, "findOne").resolves(fixtures_1.item1);
            const payload = await MongoHandlers_1.deleteInventory(fixtures_1.item1.id, true);
            expect(findMock.getCall(0).args).toEqual([{ id: fixtures_1.item1.id }]);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([{ id: fixtures_1.item1.id }]);
            expect(payload).toEqual(fixtures_1.item1.id);
            await mocker.restore();
            // soft Delete
            mocker = await sinon_1.stub(models_1.Inventory, "findOneAndUpdate").resolves(null);
            const payload2 = await MongoHandlers_1.deleteInventory(fixtures_1.item1.id, false);
            expect(findMock.getCall(1).args).toEqual([{ id: fixtures_1.item1.id }]);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([
                { id: fixtures_1.item1.id },
                { active: false }
            ]);
            expect(payload2).toEqual(fixtures_1.item1.id);
            await findMock.restore();
            await mocker.restore();
            findMock = await sinon_1.stub(models_1.Inventory, "findOne").resolves(null);
            async function temp() {
                await MongoHandlers_1.deleteInventory(fixtures_1.item1.id, false);
            }
            await expect(temp()).rejects.toThrowError(`Inventory with ${fixtures_1.item1.id} doesn't exist!`);
            await findMock.restore();
        });
    });
    describe("Order#", () => {
        it("Should Get Order", async () => {
            mocker = await sinon_1.stub(models_1.Order, "find").resolves([]);
            const payload = await MongoHandlers_1.getOrder(id);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([{ id }]);
            expect(payload).toEqual([]);
            await mocker.restore();
            mocker = await sinon_1.stub(models_1.Order, "find").resolves([fixtures_1.item2, fixtures_1.item3]);
            const payload2 = await MongoHandlers_1.getOrder();
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([{}]);
            expect(payload2).toEqual([fixtures_1.item2, fixtures_1.item3]);
        });
        it("Should update Order", async () => {
            mocker = await sinon_1.stub(models_1.Order, "findOneAndUpdate").resolves(fixtures_1.order1);
            const payload = await MongoHandlers_1.updateOrder(fixtures_1.item1.id, fixtures_1.orderDetail1);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([
                { id: fixtures_1.item1.id },
                fixtures_1.orderDetail1,
                { new: true }
            ]);
            expect(payload).toEqual(fixtures_1.order1);
        });
        it("Should create Order", async () => {
            mocker = await sinon_1.stub(models_1.Order, "create").resolves(fixtures_1.order1);
            const payload = await MongoHandlers_1.createOrder(fixtures_1.orderDetail1);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([fixtures_1.orderDetail1]);
            expect(payload).toEqual(fixtures_1.order1);
        });
        it("Should delete Order", async () => {
            let findMock = await sinon_1.stub(models_1.Order, "findOne").resolves(fixtures_1.order1);
            mocker = await sinon_1.stub(models_1.Order, "deleteOne").resolves(null);
            const payload = await MongoHandlers_1.deleteOrder(fixtures_1.order1.id);
            expect(mocker.callCount).toEqual(1);
            expect(mocker.getCall(0).args).toEqual([{ id: fixtures_1.order1.id }]);
            expect(findMock.getCall(0).args).toEqual([fixtures_1.order1.id]);
            expect(payload).toEqual(fixtures_1.order1.id);
            await findMock.restore();
            await mocker.restore();
            findMock = await sinon_1.stub(models_1.Order, "findOne").resolves(null);
            async function temp() {
                await MongoHandlers_1.deleteOrder(fixtures_1.order1.id);
            }
            await expect(temp()).rejects.toThrowError(`Order doesn't exist. ID: ${fixtures_1.order1.id}`);
            await findMock.restore();
        });
    });
});
//# sourceMappingURL=MongoHandlers_test.js.map