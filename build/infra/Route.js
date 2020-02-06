"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor(path, method, handler) {
        this.path = path;
        this.method = method;
        this.handler = handler;
    }
}
exports.Route = Route;
// Injects ApiRoutes to Express App
exports.applyRoutes = (routes, router) => {
    for (const route of routes) {
        const { path, method, handler } = route;
        router[method](path, handler);
    }
};
//# sourceMappingURL=Route.js.map