import { Router } from "express";
import {addBoarding, getAllBoarding, getBoardingById} from "../controllers/roomController";
import {upload} from "../middleware/upload";

const router = Router();

router.post('/',upload, addBoarding);
router.get('/', getAllBoarding);
router.get('/:id', getBoardingById);

export default router;
