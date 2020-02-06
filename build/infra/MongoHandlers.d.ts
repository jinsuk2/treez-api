/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
import { InventoryDetails } from "../models/inventory";
import { OrderDetails } from "../models/order";
export declare const getInventory: (id?: string, name?: string) => Promise<import("ts-mongoose").ExtractDoc<import("mongoose").Schema<any> & {
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
}>[]>;
export declare const updateInventory: (id: string, updateBody: InventoryDetails) => Promise<import("ts-mongoose").ExtractDoc<import("mongoose").Schema<any> & {
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
}>>;
export declare const createInventory: (updateBody: InventoryDetails) => Promise<import("ts-mongoose").ExtractDoc<import("mongoose").Schema<any> & {
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
}>>;
export declare const deleteInventory: (id: string, hardDelete?: boolean) => Promise<string>;
export declare const getOrder: (id?: string) => Promise<import("ts-mongoose").ExtractDoc<import("mongoose").Schema<any> & {
    definition: {
        _id: import("mongoose").Types.ObjectId;
        id?: string;
        email?: string;
        status?: string;
        items?: import("ts-mongoose/types/_shared").SubDocumentArray<{
            _id: import("mongoose").Types.ObjectId;
            count: number;
            __v: number;
            itemId: string;
            itemName: string;
        } & {} & import("ts-mongoose/types/_shared").SubDocument>;
        total?: number;
        orderDatePlaced?: string;
        __v: number;
    };
    options: import("mongoose").SchemaOptions;
}>[]>;
export declare const updateOrder: (id: string, updateBody: OrderDetails) => Promise<import("ts-mongoose").ExtractDoc<import("mongoose").Schema<any> & {
    definition: {
        _id: import("mongoose").Types.ObjectId;
        id?: string;
        email?: string;
        status?: string;
        items?: import("ts-mongoose/types/_shared").SubDocumentArray<{
            _id: import("mongoose").Types.ObjectId;
            count: number;
            __v: number;
            itemId: string;
            itemName: string;
        } & {} & import("ts-mongoose/types/_shared").SubDocument>;
        total?: number;
        orderDatePlaced?: string;
        __v: number;
    };
    options: import("mongoose").SchemaOptions;
}>>;
export declare const createOrder: (updateBody: OrderDetails) => Promise<import("mongoose").Document & {
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
} & {}>;
export declare const deleteOrder: (id: string) => Promise<string>;
