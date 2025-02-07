import jwt from 'jsonwebtoken';

export function verifyAuthCode(code: string, clientSecret: string): any {
    return jwt.verify(code, clientSecret);
}

export function generateAccessToken(clientId: string, clientSecret: string, expiresIn: string): string {
    return  jwt.sign({ clientId: clientId }, clientSecret, { expiresIn: parseInt(expiresIn), algorithm: 'HS256' });
}