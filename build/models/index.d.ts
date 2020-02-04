/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
declare const models: {
    Inventory: import("mongoose").Model<import("mongoose").Document & {
        _id: import("mongoose").Types.ObjectId;
        __v: number;
        name: string;
        id: string;
        description: string;
        price: number;
        quantity: number;
    } & {}, {}> & {
        [name: string]: Function;
    };
    Order: import("mongoose").Model<import("mongoose").Document & {
        _id: import("mongoose").Types.ObjectId;
        __v: number;
        id: string;
        email: string;
        orderDate: string;
        status: string;
    } & {}, {}> & {
        [name: string]: Function;
    };
};
export default models;
