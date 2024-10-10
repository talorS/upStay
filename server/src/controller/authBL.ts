import { sign } from 'jsonwebtoken';

const generateToken = (payload = {}): string => {
    const secretKey = process.env.ACCESS_TOKEN_SECRET!;
    const options = {
        expiresIn: process.env.JWT_EXPIRATION
    };
    const accessToken = sign(payload, secretKey, options);
    return accessToken;
}

export default generateToken;
