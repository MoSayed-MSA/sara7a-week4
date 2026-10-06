import jwt from 'jsonwebtoken'

export function generateToken(payload, expTime) {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: expTime })
}

export function verifyToken(token) {
    return jwt.verify(token, env.jwtSecret);
}