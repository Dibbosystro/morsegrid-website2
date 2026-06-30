import { Router, type IRouter } from "express";
import healthRouter from "./health";
import voiceRouter from "./voice";
import leadsRouter from "./leads";
import assessmentRouter from "./assessment";

const router: IRouter = Router();

router.use(healthRouter);
router.use(voiceRouter);
router.use(leadsRouter);
router.use(assessmentRouter);

export default router;
