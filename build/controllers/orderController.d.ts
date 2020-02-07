import { OrderDetails } from "../models/order";
export declare class OrderController {
    validateStock(newItems: any[], curr: number, finish: boolean): Promise<number>;
    finishOrder(id: string): Promise<OrderDetails>;
    private createPromise;
}
