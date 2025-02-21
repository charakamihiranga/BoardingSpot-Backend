import User from "../models/User";
import {Request, Response} from "express";
import generateToken from "../utils/generateToken";

export const signUpUser = async (req: Request , res: Response ) => {
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
}

export const signInUser =  async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id as string),
            });
        } else {
            res.status(401).json({message: 'Invalid email or password'});
        }
    } catch (e) {
        res.status(500).json({message: 'Internal server error'});
    }
}