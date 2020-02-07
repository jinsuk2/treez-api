import { stub, mock } from "sinon";
import { v4 as uuid } from "uuid";
import models from "../../models";

let mockDriverFindOneAndUpdateMethod: any;
let mockDriver: any;
let mockIsLive: any;

// let driversHandler: DriversHandler = new DriversHandler("", "", "", false);
beforeEach(async () => {});

afterEach(async () => {});

describe("DriversProjection#handle", () => {
  describe("Drivers Events", () => {
    it("should create a helper account", async () => {
      await console.log("hello");

      // expect(mockDriverFindOneAndUpdateMethod.calledOnce).toBeTruthy();
      // expect(mockDriverFindOneAndUpdateMethod.getCall(0).args).toEqual([
      //   { id: "" },
      //   {
      //     id: ""
      //   },
      //   {
      //     upsert: true,
      //     setDefaultsOnInsert: true
      //   }
      // ]);
    });
  });
});
