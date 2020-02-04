"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express tools
const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// API and Routes
const api_1 = require("./api");
const Route_1 = require("./infra/Route");
const routes_1 = require("./routes/routes");
// Express App Setup
const PORT = 3000;
const app = express();
// TreezApi Init
const treezApi = new api_1.default("mongodb://localhost:27017/treez_api_collection");
// Apply Middlewares
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    res.sendStatus(200);
});
// Apply Routes
const apiRoutes = routes_1.routes(treezApi);
Route_1.applyRoutes(apiRoutes, app);
// Start
const server = http.createServer(app);
server.listen(PORT, () => {
    apiRoutes.map((route) => console.log(`${route.method}: http://localhost:${PORT}${route.path}`));
});
//# sourceMappingURL=index.js.map