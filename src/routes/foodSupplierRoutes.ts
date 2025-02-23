import {Router} from "express";
import {addFoodSupplier} from "../controllers/foodSupplierController";
import {protector} from "../middleware/authMiddleware";
import {upload} from "../middleware/upload";

const router = Router();

router.post('/', protector, upload, addFoodSupplier);

export default router;