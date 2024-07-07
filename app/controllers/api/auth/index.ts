import 'dotenv/config'
import { env } from "process";
import { Request, Response } from 'express';
import { UsersModel } from '../../../models/user_model';
import { encryptPass, checkPass, createToken} from '../../../utils/encrypt';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';

const oAuth2Client = new OAuth2Client(
    env.CLIENT_ID, //client id
    env.CLIENT_SECRET, // client secret
    'postmessage'
)

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

    const token = await createToken({
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at
    })

    res.status(200).json({
        message: "Berhasil Login",
        data: {
            id: user.id,
            email: user.email,
            username: user.username,
            token,
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

async function WhoAmI(req:any, res:Response){
    res.status(200).json({
        status: 'OK',
        message: "Success",
        data: req.user
    })
}

async function googleAuth(req:Request, res:Response){
    const { tokens } = await oAuth2Client.getToken(req.body.code)
    const credentials = await oAuth2Client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: env.CLIENT_ID
    })
    const payload = credentials.getPayload();

    const user = await UsersModel
        .query()
        .findOne({ email: payload?.email })
    
    if(user){
        if(!user.googleId){
            await UsersModel
                .query()
                .where({ id: user.id })
                .patch({
                    ...user,
                    googleId: payload?.sub
                })
        }

        const token = await createToken({
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at
        })
    
        return res.status(201).json({
            message: "Berhasil Login",
            data: {
                id: user.id,
                email: user.email,
                username: user.username,
                token,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        })
    }

    try{
        const user = await UsersModel.query().insert(
            {
                email: payload?.email, 
                password: null,
                username: payload?.name,
                role: 'user', 
                profile_img: payload?.picture,
                googleId: payload?.sub
            }        
        ).returning('*')

        console.log(user);

        const token = await createToken({
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
            updatedAt: user.updated_at
        })

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
        console.error(e)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function googleAuthRefresh(req:Request, res:Response){
    const user = new UserRefreshClient(
        env.CLIENT_ID,
        env.CLIENT_SECRET,
        req.body.refreshToken,
    )
    const { credentials } = await user.refreshAccessToken();
    res.json(credentials)
}
export default{
    register,
    login,
    WhoAmI,
    googleAuth,
    googleAuthRefresh
}