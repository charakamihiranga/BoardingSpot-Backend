import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
    user?: any; // Adding user to the Request object
}

export const protector = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    // Check if token exists in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

            // Attach user info (excluding password) to request object
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Move to next middleware/controller
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
