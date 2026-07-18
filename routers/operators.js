import { operatorsRepo, logsRepo } from "../repositories/repo.js";
import express from "express";
import { success, fail } from "../utils/response.js";

export const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { name, operator_rank } = req.body;
        if (!name || !operator_rank) {
            const error = new Error("You must enter name and operator_rank");
            error.status = 400;
            throw error;
        }
        const newId = await operatorsRepo.create({ name, operator_rank });
        await logsRepo.create({
            action: "OPERATORE_CREATED",
            description: `new operator created. id: ${newId}`,
            operator_id: newId
        });
        return res.json(success(`operator ${newId} created successfully`));
    } catch (error) {
        next(error);
    }
});
