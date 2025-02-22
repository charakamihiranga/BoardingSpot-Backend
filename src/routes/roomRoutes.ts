import { Router } from "express";
import {addBoarding} from "../controllers/roomController";
import {upload} from "../middleware/upload";

const router = Router();

router.post('/',upload, addBoarding);

export default router;
