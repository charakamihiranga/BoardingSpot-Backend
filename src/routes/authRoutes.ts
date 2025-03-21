import { Router } from 'express';
import {googleAuth, refreshToken, signInUser, signUpUser} from "../controllers/authController";

const router = Router();

router.post('/signup', signUpUser );
router.post('/signin', signInUser);
router.post('/refresh-token', refreshToken);
router.post("/google", googleAuth);

export default router;