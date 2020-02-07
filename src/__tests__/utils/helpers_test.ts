import { stub, mock } from "sinon";
import { v4 as uuid } from "uuid";
import models, { Inventory } from "../../models";
import { emptyGuard, updateStock } from "../../utils/helpers";

beforeEach(async () => {});

afterEach(async () => {});

describe("Helpers#", () => {
  it("Should guard accordingly", async () => {
    let bool: Boolean;
    bool = emptyGuard([{}]);
    expect(bool).toBeTruthy();
    bool = emptyGuard([]);
    expect(bool).toBeFalsy();
    bool = emptyGuard(null);
    expect(bool).toBeFalsy();
  });
  it("Should updateStock", async () => {
    const id = uuid();
    const update = await stub(Inventory, "findOneAndUpdate").resolves(null);
    updateStock(id, 1);
    const date = new Date().toISOString();
    expect(update.callCount).toEqual(1);
    expect(update.getCall(0).args).toEqual([
      { id },
      { quantity: 1, lastUpdated: date }
    ]);
  });
});
