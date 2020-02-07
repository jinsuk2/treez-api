export declare class OrderController {
    validateStock(newItems: any[], curr: number, finish: boolean): Promise<number>;
    finishOrder(id: string): Promise<any>;
    private createPromise;
}
