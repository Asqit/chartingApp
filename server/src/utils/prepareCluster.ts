import cluster from "node:cluster";
import { cpus } from "node:os";
import logger from "../config/logger";
import prepareExpress from "./prepareExpress";

function prepareCluster() {
	const THREAD_COUNT = cpus().length;

	logger.info(`Preparing a cluster of ${THREAD_COUNT} threads`);
	
	for (let i = 0;i < THREAD_COUNT;i++) {
		cluster.fork();
	}
	
	cluster.on("exit", (worker, code, signal) => {
		logger.error(`The thread ${worker.process.pid} died with code ${code} and signal ${signal}`);
		logger.info("Starting a replacement thread");
		cluster.fork();
	});
}

export default function initCluster() {
	const isDevelopment = process.env.NODE_ENV === "development";
	const { isPrimary } = cluster;
	
	if (isDevelopment) {
		prepareExpress();
		return;
	}


	if (isPrimary) {
		prepareCluster();
	} else {
		prepareExpress();
	}
}

