import { error, log } from "console";
import User from "../models/User";
import { generateRefreshToken, generateAccessToken } from "../utils/generateToken";
import jwt, { Secret } from "jsonwebtoken";
import {OAuth2Client} from "google-auth-library";
import bcrypt from "bcryptjs";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: any, res: any) => {
    try {
        const { token }  = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(401).json({message: "Invalid Google token"});
        }
        const {name, email, picture} = payload;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                fullName: name,
                email,
                profilePicture: picture,
                // First, generates a random float number between 0 and 1, then converts it to a base-36 string,
                // which includes digits (0-9) and lowercase letters (a-z). Then, it takes the last 8 characters from the string and uses it as the password,
                // and 10 represents the number of rounds for bcrypt hashing
                password: await bcrypt.hash(Math.random().toString(36).slice(-8),10)
            });
        }
        const accessToken = generateAccessToken(user._id as string);
        const refreshToken = generateRefreshToken(user._id as string);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server error"});
    }
}

export const signUpUser = async (req: any, res: any) => {
    
    const { fullName, email, dob, gender, profilePicture, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists with this email. Use another email." });
        }

        const user = await User.create({
            fullName, email, dob, gender, profilePicture, password
        });

        if (user) {
            const accessToken = generateAccessToken(user._id as string);
            const refreshToken = generateRefreshToken(user._id as string);

            await user.save();

            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                gender: user.gender,
                accessToken,
                refreshToken
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (e) {
        error(e);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const signInUser = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const accessToken = generateAccessToken(user._id as string);
        const refreshToken = generateRefreshToken(user._id as string);

        // Store access token in HttpOnly cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: "Strict",
        });

        // Store refresh token in HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        await user.save();

        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            gender: user.gender,
        });
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
};


export const refreshToken = async (req: any, res: any) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret) as { userId: string };
        const user = await User.findOne({ _id: payload.userId })
            .select("fullName email gender")
            .lean();
        const newAccessToken = generateAccessToken(payload.userId);

        res.json({
            user: user,
            accessToken: newAccessToken
        });
    } catch (e) {
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};
