const users = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addUserController = async(req,res)=>{
    console.log("Inside add user controller");
    const {username, email, password} = req.body

    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            req.status(406).json("Existing User")
        }else{
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password:hashPassword, profileImg:""
            })
            newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.loginUserController = async(req,res)=>{
    console.log("Inside Login Controller");
    const {email, password} = req.body
    console.log(email,password);
    
    try {
        const existingEmail = await users.findOne({email})
        console.log(existingEmail);
        
        if(existingEmail){
            let isPswdMatch = await bcrypt.compare(password, existingEmail.password)
            console.log(isPswdMatch);
            
            if(isPswdMatch || password==existingEmail.password){
                const token = jwt.sign({userId:existingEmail._id}, process.env.JWTPASSWORD)
                console.log(token);
                res.status(200).json({user:existingEmail,token})
            }else{
                res.status(404).json("Incorrect Email/Password")
            }
        }else{
            res.status(404).json("Incorrect Email/Password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.editUserController = async(req,res)=>{
    const  {profileImg} = req.body
    const userId = req.userId
    try {
        const existingUser = await users.findById({_id:userId})
        existingUser.profileImg = profileImg
        existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllUserController = async(req,res)=>{
    console.log("Inside get all user controller");
    try {
        const  allUsers = await users.find().skip(1)
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
    
}