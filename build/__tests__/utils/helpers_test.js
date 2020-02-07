"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const uuid_1 = require("uuid");
const models_1 = require("../../models");
const helpers_1 = require("../../utils/helpers");
beforeEach(async () => { });
afterEach(async () => { });
describe("Helpers#", () => {
    it("Should guard accordingly", async () => {
        let bool;
        bool = helpers_1.emptyGuard([{}]);
        expect(bool).toBeTruthy();
        bool = helpers_1.emptyGuard([]);
        expect(bool).toBeFalsy();
        bool = helpers_1.emptyGuard(null);
        expect(bool).toBeFalsy();
    });
    it("Should updateStock", async () => {
        const id = uuid_1.v4();
        const update = await sinon_1.stub(models_1.Inventory, "findOneAndUpdate").resolves(null);
        helpers_1.updateStock(id, 1);
        const date = new Date().toISOString();
        expect(update.callCount).toEqual(1);
        expect(update.getCall(0).args).toEqual([
            { id },
            { quantity: 1, lastUpdated: date }
        ]);
    });
});
//# sourceMappingURL=helpers_test.js.map