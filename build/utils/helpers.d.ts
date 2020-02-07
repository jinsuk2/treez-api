export declare const emptyGuard: (order: any[]) => boolean;
export declare const updateStock: (id: string, count: number) => Promise<void>;
declare const helpers: {
    emptyGuard: (order: any[]) => boolean;
    updateStock: (id: string, count: number) => Promise<void>;
};
export default helpers;
