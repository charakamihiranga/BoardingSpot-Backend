import express, { Request, Response, Router } from 'express';
import User from "../models/User";
import generateToken from "../utils/generateToken";

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
    const {fullName, email, dob, occupation, profilePicture, password} = req.body;
    try {
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: 'User already exists with this email.use another email'});
        }
        const user = await User.create({fullName, email, dob, occupation, profilePicture, password});
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id as string),
            });
        } else {
            res.status(400).json({message: 'Invalid user data'});
        }
    } catch (e) {
        res.status(500).json({message: 'Internal server error'});
    }
});

router.post('/signin', (req, res) => {
    console.log('signin request received');
});

export default router;