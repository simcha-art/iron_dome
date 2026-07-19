import express from "express";
import { incidentsRepo, logsRepo } from "../repositories/repo.js";
import { success } from "../utils/response.js";

export const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { code_name, threat_level, operator_id } = req.body;
        let errMsg;
        if (!code_name) {
            errMsg = "You must enter code_name";
        } else if (
            Number.isNaN(threat_level) ||
            threat_level > 12 ||
            threat_level < 0
        ) {
            errMsg = "threat_level must be a number between 0 to 12";
        } else if (Number.isNaN(operator_id)) {
            errMsg = "You must enter operator_id (number)";
        }
        if (errMsg) {
            const error = new Error(errMsg);
            error.status = 400;
            throw error;
        }
        const newId = await incidentsRepo.create({
            code_name,
            threat_level,
            operator_id,
        });
        await logsRepo.create({
            action: "INCIDENT_CREATED",
            description: "new incident created",
            operator_id,
            incident_id: newId,
        });
        return res.json(
            success(`incident ${newId} for operator ${operator_id} created`),
        );
    } catch (error) {
        next(error);
    }
});

router.patch("/:id/status", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const { status } = req.body;
        console.log(`id: ${id}, status: ${status}`);
        let errMsg;
        if (Number.isNaN(id)) {
            errMsg = "id is required, and it must be a number";
        } else if (!status) {
            errMsg = "status is required (OPEN, TRACKING, INTERCEPTED, CLOSED)";
        }
        if (errMsg) {
            const error = new Error(errMsg);
            error.status = 400;
            throw error;
        }

        const rowsAffected = await incidentsRepo.update(id, { status });
        if (rowsAffected === 0) {
            const error = new Error(`incident ${id} not found`)
            error.status = 404
            throw error
        }
        res.json(success(`incident ${id} updated successfully`));
    } catch (error) {
        next(error);
    }
});

router.get("/open", async (req, res, next) => {
    try {
        const opens = await incidentsRepo.get({ status: "OPEN" });
        const trackings = await incidentsRepo.get({ status: "TRACKING" });
        const all_opens = [...opens, ...trackings]
        res.json(success(all_opens));
    } catch (error) {
        next(error);
    }
});
