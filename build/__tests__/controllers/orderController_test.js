"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const uuid_1 = require("uuid");
const handlers = require("../../infra/MongoHandlers");
const controllers_1 = require("../../controllers");
const fixtures_1 = require("../fixtures");
const enums_1 = require("../../utils/enums");
let getOrderMock;
let getInventoryByNameMock;
let emptyOrderMock;
let id;
let orderController = new controllers_1.OrderController();
beforeEach(async () => {
    // hide log messages
    console.log = jest.fn();
    id = uuid_1.v4();
    getOrderMock = await sinon_1.stub(handlers, "getOrder").resolves([fixtures_1.order1]);
    getInventoryByNameMock = await sinon_1.stub(handlers, "getInventoryByName").resolves(fixtures_1.item1);
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
                email: fixtures_1.order1.email,
                items: fixtures_1.order1.items,
                status: enums_1.OrderStatus.APPROVED,
                total: fixtures_1.order1.total,
                lastUpdated: date,
                orderDatePlaced: date
            });
        });
        it("Should Not Return if Inventory not found in db", async () => {
            await getOrderMock.restore();
            emptyOrderMock = await sinon_1.stub(handlers, "getOrder").resolves([]);
            async function mockFunction() {
                await orderController.finishOrder(id);
            }
            await expect(mockFunction()).rejects.toThrow(new Error(`No Order Found for ID: ${id}`));
            await emptyOrderMock.restore();
        });
    });
    describe("validateStock#", () => {
        it("Should return a total number for new Total", async () => {
            const number = await orderController.validateStock([{ name: fixtures_1.item1.name, count: 1 }], 0, false);
            expect(number).toEqual(fixtures_1.item1.unitPrice * 1);
        });
        it("Should throw error for missing name / count", async () => {
            async function noCount() {
                await orderController.validateStock([{ name: "" }], 1, false);
            }
            await expect(noCount()).rejects.toThrowError("Missing Name or Count of the Item");
            async function noName() {
                await orderController.validateStock([{ count: 1 }], 1, false);
            }
            await expect(noName()).rejects.toThrowError("Missing Name or Count of the Item");
        });
    });
});
//# sourceMappingURL=orderController_test.js.map