import { Router } from "express";
import {
    addBoarding,
    deleteBoarding, filterBoardings,
    getAllBoarding,
    getBoardingById,
    getBoardingsByOwner, updateBoarding
} from "../controllers/roomController";
import {upload} from "../middleware/upload";
import {protector} from "../middleware/authMiddleware";

const router = Router();

router.post('/',protector, upload, addBoarding);
router.get('/',protector, getAllBoarding);
router.get('/filter', protector, filterBoardings);
router.get('/:id',protector, getBoardingById);
router.delete('/:id',protector, deleteBoarding);
router.get('/owner/:ownerId',protector, getBoardingsByOwner);
router.patch('/:id',protector, upload, updateBoarding);


export default router;
