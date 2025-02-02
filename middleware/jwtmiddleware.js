const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside JWT Middleware");
    const token = req.headers['authorization'].split(" ")[1]
    if(token){
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD)
            req.userId = jwtResponse.userId
            next()
        } catch (error) {
            res.status(401).json("Authorization Failed.... Please Login")
        }
    }else{
        res.status(404).json("Authorization Failed... Token is missing")
    }
    
}

module.exports = jwtMiddleware