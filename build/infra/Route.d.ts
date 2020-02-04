import { NextFunction, Request, Response, Router } from "express";
declare type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;
export declare class Route {
    path: string;
    method: "get" | "post" | "put" | "delete";
    handler: Handler | Handler[];
    constructor(path: string, method: "get" | "post" | "put" | "delete", handler: Handler | Handler[]);
}
export declare const applyRoutes: (routes: Route[], router: Router) => void;
export {};
