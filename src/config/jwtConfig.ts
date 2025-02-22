import express from "express";
import jwt, {Secret} from "jsonwebtoken";

export function authenticationToken(req: express.Request,  res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    console.log('token', token);

    if (!token) res.status(401).json({message: 'No token provided'});

    try {
        const payload = jwt.verify(token as string, process.env.JWT_SECRET as Secret) as {id: string, iat: number};
        console.log(payload.id)
        req.body.id = payload.id;
        next();
    } catch (e) {
        res.status(401).send(e);
    }
}