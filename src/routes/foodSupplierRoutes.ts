import {Router} from "express";
import {
    addFoodSupplier, deleteFoodSupplier,
    getFoodSupplierById, getFoodSuppliers,
    updateFoodSupplier
} from "../controllers/foodSupplierController";
import {protector} from "../middleware/authMiddleware";
import {upload} from "../middleware/upload";

const router = Router();

router.post('/', protector, upload, addFoodSupplier);
router.get('/', protector, getFoodSuppliers);
router.get('/:id', protector, getFoodSupplierById);
router.patch('/:id', protector, upload, updateFoodSupplier);
router.delete('/:id', protector, deleteFoodSupplier);


export default router;