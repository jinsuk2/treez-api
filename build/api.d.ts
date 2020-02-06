export default class TreezApi {
    private readonly DBUrl;
    private readonly inventoryController;
    private readonly orderController;
    constructor(DBUrl: string);
    getRoutes(): import("./infra/Route").Route[];
}
