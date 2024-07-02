import bcrypt from 'bcryptjs'

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