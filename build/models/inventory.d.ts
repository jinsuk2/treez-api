/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
import { ExtractDoc, ExtractProps } from "ts-mongoose";
declare const inventorySchema: import("mongoose").Schema<any> & {
    definition: {
        _id: import("mongoose").Types.ObjectId;
        name?: string;
        id?: string;
        description?: string;
        price?: number;
        quantity?: number;
        __v: number;
    };
    options: import("mongoose").SchemaOptions;
};
declare const Inventory: import("mongoose").Model<import("mongoose").Document & {
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
interface InventoryDetails {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}
declare type InventoryDoc = ExtractDoc<typeof inventorySchema>;
declare type InventoryProps = ExtractProps<typeof inventorySchema>;
export { Inventory, InventoryDetails, InventoryDoc, InventoryProps };
