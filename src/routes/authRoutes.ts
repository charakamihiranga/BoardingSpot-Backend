import { Router } from 'express';
import {refreshToken, signInUser, signUpUser} from "../controllers/authController";

const router = Router();

router.post('/signup', signUpUser );
router.post('/signin', signInUser);
router.post('/refresh-token', refreshToken);

export default router;