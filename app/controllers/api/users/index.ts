import { Request, Response } from 'express';
import { UsersModel } from '../../../models/user_model';
import { encryptPass, checkPass} from '../../../utils/encrypt';

async function login(req:Request, res:Response){
    const { email, password } = req.body;
    
    const user = await UsersModel
        .query()
        .findOne({ email })
    
    if(!user){
        return res.status(404)
        .json({
            message: "Email tidak ditemukan!"
        })
    }

    const isPasswordCorrect = await 
        checkPass(user.password as string, password)

    if(!isPasswordCorrect){
        return res.status(401)
        .json({
            message: "Password salah!"
        })
    }

    // const token = await createToken({
    //     id: user.id,
    //     email: user.email,
    //     role: user.role,
    //     createdAt: user.created_at,
    //     updatedAt: user.updated_at
    // })

    res.status(200).json({
        message: "Berhasil Login",
        data: {
            id: user.id,
            email: user.email,
            username: user.username,
            // token,
            createdAt: user.created_at,
            updatedAt: user.updated_at
        }
    })
}

async function register(req:Request, res:Response){
    const { email, password, username, profile_img } = req.body;
    if(!email || !password || !username){
        return res.status(400).json({
            message: "Silahkan input data dengan lengkap!"
        })
    }
    try{
        const encryptedPass = await encryptPass(password)

        const user = await UsersModel.query().insert(
            {
                email,
                password: encryptedPass,
                username,
                role: 'user',
                profile_img
            }
        )
        res.status(201).json({
            message: "Berhasil Register",
            data: {
                id: user.id,
                email: user.email,
                username: user.username,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        })
    } catch(e){
        res.status(409).json({
            message: "Email sudah terdaftar!"
        })
    }
}
export default{
    register,
    login
}