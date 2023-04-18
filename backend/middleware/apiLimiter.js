import rateLimit from 'express-rate-limit';
import { systemLogs } from '../utils/Logger.js';

export const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: { message: 'Too Many Requests, Try Again in 15mins' },
	handler: (req, res, next, options) => {
		systemLogs.error(
			`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
		);
		res.status(options.statusCode).send(options.message);
	},
	standardHeaders: true,
	legacyHeaders: false,
});

export const loginLimiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 20,
	message: { message: 'Too Many Attempts, Try Again in 30mins' },
	handler: (req, res, next, options) => {
		systemLogs.error(
			`Too many attempts: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
		);
		res.status(options.statusCode).send(options.message);
	},
	standardHeaders: true,
	legacyHeaders: false,
});
