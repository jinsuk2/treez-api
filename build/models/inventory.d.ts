/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
import { ExtractDoc, ExtractProps } from "ts-mongoose";
declare const inventorySchema: import("mongoose").Schema<any> & {
    definition: {
        _id: import("mongoose").Types.ObjectId;
        id?: string;
        name?: string;
        quantity?: number;
        unitPrice?: number;
        description?: string;
        itemIds?: string[];
        lastUpdated?: string;
        active?: boolean;
        __v: number;
    };
    options: import("mongoose").SchemaOptions;
};
declare const Inventory: import("mongoose").Model<import("mongoose").Document & {
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
interface InventoryDetails {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    description: string;
    lastUpdated: string;
    active: boolean;
    itemIds?: string[];
}
declare type InventoryDoc = ExtractDoc<typeof inventorySchema>;
declare type InventoryProps = ExtractProps<typeof inventorySchema>;
export { Inventory, InventoryDetails, InventoryDoc, InventoryProps };
