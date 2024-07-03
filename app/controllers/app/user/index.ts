import { Request, Response } from 'express';
import { UsersModel } from '../../../models/user_model';
import { checkPass } from '../../../utils/encrypt';

type SessionReq = Request & {
    session:{
        user: UsersModel
        isAuthenticated: boolean
    }
}

type SessionRes = Response & {
    session:{
        user: UsersModel
        isAuthenticated: boolean
    }
}

async function index(req: any, res: any){
     return res.render("index.ejs", {
        user: req.session.user
    })
}

async function loginView(req:any, res:any){
    return res.render("login.ejs")
}

async function login(req:any, res:any){
    const { email, password } = req.body;
    
    const user = await UsersModel
        .query()
        .findOne({ email })
    
    if(!user){
        return res.status(404)
        .send("Email tidak ditemukan!")
    }

    const isPasswordCorrect = await 
        checkPass(user.password as string, password)

    if(!isPasswordCorrect){
        return res.status(401)
        .send("Password Salah!")
    }

    req.session.isAuthenticated = true;
    req.session.user = user;
    res.redirect("/")
}

async function logout(req:any, res:any) {
    req.session.destroy((err: unknown) => {
        console.log(err)
        res.redirect("/login")
    })
}



export default{
    login,
    logout,
    index,
    loginView
}