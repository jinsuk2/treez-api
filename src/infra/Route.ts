import { NextFunction, Request, Response, Router } from "express";

// Type Guard for Express Handler
type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export class Route {
  // Creates api Route into Express injectable format
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

// Injects ApiRoutes to Express App
export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { path, method, handler } = route;
    router[method](path, handler);
  }
};
