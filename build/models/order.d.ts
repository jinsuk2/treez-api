/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
import { ExtractDoc, ExtractProps } from "ts-mongoose";
declare const orderSchema: import("mongoose").Schema<any> & {
    definition: {
        _id: import("mongoose").Types.ObjectId;
        id?: string;
        lastUpdated?: string;
        email?: string;
        status?: string;
        items?: import("ts-mongoose/types/_shared").SubDocumentArray<{
            _id: import("mongoose").Types.ObjectId;
            count: number;
            __v: number;
            name: string;
        } & {} & import("ts-mongoose/types/_shared").SubDocument>;
        total?: number;
        orderDatePlaced?: string;
        __v: number;
    };
    options: import("mongoose").SchemaOptions;
};
declare const Order: import("mongoose").Model<import("mongoose").Document & {
    _id: import("mongoose").Types.ObjectId;
    __v: number;
    id: string;
    lastUpdated: string;
    email: string;
    status: string;
    items: import("ts-mongoose/types/_shared").SubDocumentArray<{
        _id: import("mongoose").Types.ObjectId;
        count: number;
        __v: number;
        name: string;
    } & {} & import("ts-mongoose/types/_shared").SubDocument>;
    total: number;
    orderDatePlaced: string;
} & {}, {}> & {
    [name: string]: Function;
};
interface OrderDetails {
    id: string;
    email: string;
    items: any[];
    status: string;
    total: number;
    lastUpdated: string;
    orderDatePlaced?: string;
}
declare type OrderDoc = ExtractDoc<typeof orderSchema>;
declare type OrderProps = ExtractProps<typeof orderSchema>;
export { Order, OrderDetails, OrderDoc, OrderProps, orderSchema };
