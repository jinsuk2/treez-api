import { RequestType } from "./utils/enums";
export default class TreezApi {
    private readonly DBUrl;
    constructor(DBUrl: string);
    get(reqType: RequestType, id?: string): Promise<any>;
    update(reqType: RequestType, details: any, upsert: boolean): Promise<any>;
    delete(reqType: RequestType, id: string): Promise<string>;
}
