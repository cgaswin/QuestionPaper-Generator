import dotenv from "dotenv";
import express, { Application} from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import morgan from "morgan";

dotenv.config();

const app: Application = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	} as CorsOptions)
);


app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(morgan("dev"));

const limiter: RateLimitRequestHandler = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // limit each IP to 100 requests per windowMs
	legacyHeaders: false,
	message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use("/api", limiter);


export default app;
