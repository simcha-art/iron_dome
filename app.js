import express from "express";
import { handleErrors } from "./services/errorHandler.js";
import { router as operatorsRouter } from "./routers/operators.js";
import { router as incidentRouter } from "./routers/incidents.js";
const app = express();

app.get("/", (req, res) => {
    res.end("HELLO FROM YOUR SERVER, good morning");
});

app.get("/health", (req, res) => {
    res.end("Server is on");
});

app.use(express.json())

app.use("/operators", (req, res, next) => operatorsRouter(req, res, next));
app.use("/incidents", (req, res, next) => incidentRouter(req, res, next));


app.use(handleErrors)

app.listen(process.env.PORT, () =>
    console.log(`Listenning on port ${process.env.PORT}`),
);
