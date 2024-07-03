import 'dotenv/config'
import { env } from "process";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const salt = 10;

// register
export async function encryptPass(password: string)
{
    try {
        const result = await bcrypt.hash(password, salt)
        return result

    } catch (e){
        throw e
    }
}

// login
export async function checkPass(encryptPass: string, password: string)
{
    try {
        const result = await bcrypt.compare(password,encryptPass)
        return result

    } catch (e) {
        throw e
    }
    
}

export async function createToken(payload: string | Buffer | object){
    return jwt.sign(payload, String(env.TOKEN_SECRET), { expiresIn: '1800s' })
}