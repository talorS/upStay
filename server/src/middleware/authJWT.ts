import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

export interface IAuthRequest extends Request {
    user: any
}

//verift jwt token sent from client
const verifyToken = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, payload) => {
            if (err) {
                return res.sendStatus(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            }
            req.user = payload;
            next();
        });
    } else {
        res.sendStatus(401).json({
            success: false,
            message: 'Token is not provided',
        });
    }
};

export default verifyToken;