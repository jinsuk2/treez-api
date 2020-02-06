/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
import { Inventory } from "./inventory";
import { Order } from "./order";
declare const models: {
    Inventory: import("mongoose").Model<import("mongoose").Document & {
        _id: import("mongoose").Types.ObjectId;
        __v: number;
        id: string;
        name: string;
        quantity: number;
        unitPrice: number;
        description: string;
        itemIds: string[];
        lastUpdated: string;
        active: boolean;
    } & {}, {}> & {
        [name: string]: Function;
    };
    Order: import("mongoose").Model<import("mongoose").Document & {
        _id: import("mongoose").Types.ObjectId;
        __v: number;
        id: string;
        email: string;
        status: string;
        items: import("ts-mongoose/types/_shared").SubDocumentArray<{
            _id: import("mongoose").Types.ObjectId;
            count: number;
            __v: number;
            itemId: string;
            itemName: string;
        } & {} & import("ts-mongoose/types/_shared").SubDocument>;
        total: number;
        orderDatePlaced: string;
    } & {}, {}> & {
        [name: string]: Function;
    };
};
export { Inventory };
export { Order };
export default models;
