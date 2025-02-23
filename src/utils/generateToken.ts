import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
    // @ts-ignore
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRE as string,
    });
};

export const generateRefreshToken = (userId: string) => {
    // @ts-ignore
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE as string,
    });
};
