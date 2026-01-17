// src/lib/app-jwt.ts
import { jwtVerify, type JWTPayload } from 'jose';

export type AppJwtPayload = JWTPayload & {
    sub?: string;
    role?: 'CLIENT' | 'PROFESSIONAL' | 'ADMIN' | 'BARBER'; // tolera legado BARBER
    companyId?: string;
    email?: string;
    name?: string | null;
};

function getJwtSecretKey() {
    const secret = process.env.APP_JWT_SECRET;
    if (!secret) {
        throw new Error('APP_JWT_SECRET não definido no .env');
    }
    return new TextEncoder().encode(secret);
}

export async function verifyAppJwt(token: string): Promise<AppJwtPayload> {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload as AppJwtPayload;
}
