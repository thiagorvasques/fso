import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
 res.send(diagnosesService.getAllDiagnoses());
});





export default diagnosesRouter;