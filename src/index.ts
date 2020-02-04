// Express tools
import * as http from "http";
const express = require("express");
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

// API and Routes
import TreezApi from "./api";
import { applyRoutes, Route } from "./infra/Route";
import { routes } from "./routes/routes";

// Express App Setup
const PORT = 3000;
const app = express();

// TreezApi Init
const treezApi = new TreezApi("mongodb://localhost:27017/treez_api_collection");

// Apply Middlewares
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.options("/*", (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.sendStatus(200);
});

// Apply Routes
const apiRoutes = routes(treezApi);
applyRoutes(apiRoutes, app);

// Start
const server = http.createServer(app);
server.listen(PORT, () => {
  apiRoutes.map((route: Route) =>
    console.log(`${route.method}: http://localhost:${PORT}${route.path}`)
  );
});
