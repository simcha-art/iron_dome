import express from "express";
import { handleErrors } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import { router as operatorsRouter } from "./routers/operators.js";
import { router as incidentRouter } from "./routers/incidents.js";
import env from "dotenv";

env.config({ path: ".env" });

const app = express();

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
    res.end("HELLO FROM YOUR SERVER, good morning");
});

app.get("/health", (req, res) => {
    res.end("Server is on");
});

app.use("/operators", operatorsRouter);
app.use("/incidents", incidentRouter);

app.use(handleErrors);

app.listen(process.env.PORT, () =>
    console.log(`Listenning on port ${process.env.PORT}`),
);
