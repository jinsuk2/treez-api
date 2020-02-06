export declare class OrderController {
    updateOrderItems(id: string, itemId: string, count: number): Promise<any>;
    finishOrder(id: string): Promise<any>;
    private emptyGuard;
}
