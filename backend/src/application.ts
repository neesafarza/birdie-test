import * as express from "express";
import { eventController } from "./controllers/eventController";
import * as cors from "cors";

const app = express();

app.use(cors());

app.use(eventController);

export default app;
