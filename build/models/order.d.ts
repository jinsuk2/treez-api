/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
import { ExtractDoc, ExtractProps } from "ts-mongoose";
declare const orderSchema: import("mongoose").Schema<any> & {
    definition: {
        _id: import("mongoose").Types.ObjectId;
        id?: string;
        email?: string;
        orderDate?: string;
        status?: string;
        __v: number;
    };
    options: import("mongoose").SchemaOptions;
};
declare const Order: import("mongoose").Model<import("mongoose").Document & {
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    id: string;
    email: string;
    orderDate: string;
    status: string;
} & {}, {}> & {
    [name: string]: Function;
};
interface OrderDetails {
    id: string;
    email: string;
    orderDate: string;
    status: string;
}
declare type OrderDoc = ExtractDoc<typeof orderSchema>;
declare type OrderProps = ExtractProps<typeof orderSchema>;
export { Order, OrderDetails, OrderDoc, OrderProps, orderSchema };
