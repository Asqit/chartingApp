import cookieParser from "cookie-parser";
import compression from "compression";
import express from "express";
import http from "node:http";
import helmet from "helmet";
import cors from "cors";
import path from "node:path";

import logger from "../config/logger";
import * as middlewares from "../middlewares";
import * as routes from "../routes";
import config from "../config/config";

export default function prepareExpress() {
	const router = express();
	const server = http.createServer(router);
	const { hostname, port } = config.server;
	const buildPath = path.normalize(path.join(__dirname, "../client/dist"));

	// Disable metadata and other...
	router.disable("x-powered-by");

	// Init middlewares
	router.use(compression());
	router.use(express.urlencoded({ extended: true }));
	router.use(express.json());
	router.use(cookieParser());
	router.use(helmet());
	router.use(cors());
	router.use(middlewares.requestLogger);

	// Api endpoints
	router.use("/api/auth", routes.authRoutes);
	router.use("/api/record", routes.recordRoutes);
	router.use("/api/branch", routes.branchRoutes);

	// Client-side serving
	if (process.env.NODE_ENV === "production") {
		router.use(express.static(buildPath));
		router.get("(/*)?", (req, res) => {
			res.sendFile(path.join(buildPath, "index.html"));
		});
	}
		
	router.use(middlewares.notFound);
	router.use(middlewares.errorHandler);

	server.listen(port, () => {
		logger.info(`Express application with pid of ${process.pid} is now available at ${hostname}:${port}`);
	});
}
