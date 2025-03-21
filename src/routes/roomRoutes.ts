import { Router } from "express";
import {
    addBoarding,
    deleteBoarding,
    getBoardingById, getBoardings, getBoardingsByLocationBounds,
    getBoardingsByOwner, updateBoarding
} from "../controllers/roomController";
import {upload} from "../middleware/upload";
import {protector} from "../middleware/authMiddleware";

const router = Router();

router.post('/',protector, upload, addBoarding);
router.get('/', getBoardings);
router.get('/nearby', getBoardingsByLocationBounds);
router.get('/:id', getBoardingById);
router.delete('/:id',protector, deleteBoarding);
router.get('/owner/:ownerId',protector, getBoardingsByOwner);
router.patch('/:id',protector, upload, updateBoarding);


export default router;
