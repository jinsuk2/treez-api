import { NextFunction, Request, Response, Router } from "express";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export class Route {
  public path: string;
  public method: "get" | "post" | "put" | "delete";
  public handler: Handler | Handler[];
  constructor(
    path: string,
    method: "get" | "post" | "put" | "delete",
    handler: Handler | Handler[]
  ) {
    this.path = path;
    this.method = method;
    this.handler = handler;
  }
}

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { path, method, handler } = route;
    router[method](path, handler);
  }
};
