import jwt, {Secret} from "jsonwebtoken";

const generateToken = (userId: string): string => {
    // @ts-ignore
    return jwt.sign({id: userId}, process.env.JWT_SECRET as Secret , {
        expiresIn: process.env.JWT_EXPIRE
    });
}

export default generateToken;