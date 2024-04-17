const jwt = require('jsonwebtoken')

const RegisterModel = require('../Models/RegisterModel')

const isRequireSign = async (req, res, next) => {
    try{
        let token = req.header('x-token');
        if(!token){
            return res.status(400).send("Token Not Found")
        }
        let decode = jwt.verify(token, 'jwtSecret')
        req.user = decode.user
        next();
    }
    catch(err){
        return res.status(500).send("Invalid Token")
    }
}

// const isProjectManager = async (req, res, next) => {
//     try {
//         const exist = await RegisterModel.findById(req.user.id)
//         if(exist.role !== 'project manager'){
//             return res.status(401).send({
//                 success: false,
//                 message: "Un Authorized Access"
//             })
//         }
//         else{
//             next();
//         }
//     } catch (error) {
//         return res.status(401).send({
//             success: false,
//             message: "Error in Middleware",
//             error
//         })
//     }
// }

module.exports = { isRequireSign }