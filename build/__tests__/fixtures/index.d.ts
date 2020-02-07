import { InventoryDetails } from "../../models/inventory";
import { OrderStatus } from "../../utils/enums";
import { OrderDetails } from "../../models/order";
export declare const item1: {
    id: any;
    name: string;
    description: string;
    unitPrice: number;
    quantity: number;
    active: boolean;
    lastUpdated: string;
};
export declare const item2: {
    id: any;
    name: string;
    description: string;
    unitPrice: number;
    quantity: number;
    active: boolean;
    lastUpdated: string;
};
export declare const item3: {
    id: any;
    name: string;
    description: string;
    unitPrice: number;
    quantity: number;
    active: boolean;
    lastUpdated: string;
};
export declare const orderItem1: {
    name: string;
    count: number;
};
export declare const order1: {
    id: any;
    email: string;
    items: {
        name: string;
        count: number;
    }[];
    total: number;
    status: OrderStatus;
    lastUpdated: string;
};
export declare const invenDetail1: InventoryDetails;
export declare const orderDetail1: OrderDetails;
