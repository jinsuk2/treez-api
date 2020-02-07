/// <reference types="mongoose" />
/// <reference types="ts-mongoose/plugin" />
export declare const orderItemSchema: import("mongoose").Schema<any> & {
    definition: {
        _id: import("mongoose").Types.ObjectId;
        count?: number;
        name?: string;
        __v: number;
    };
    options: import("mongoose").SchemaOptions;
};
