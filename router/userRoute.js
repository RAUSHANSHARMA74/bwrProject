const express = require("express")
const userRoutes = express.Router()
const { userRegister, userOtpVerification, userLogin, userUpdateData } = require("../controller/userLoginController")
// const {authorizationUser} = require("../authentication/authenticateUser")
const { userModel, UsersModel } = require("../model/usersModel")

userRoutes.get("/users", async (req, res)=>{
    try {
        let allUsers = await UsersModel.findAll()
        res.send(allUsers)
    } catch (error) {
        console.log("something went wrong in get all user")
    }
})

//USER REGISTER ROUTE
userRoutes.post("/register", userRegister)


//USER OTP VERIFICATION
userRoutes.post("/otpVerification", userOtpVerification)


//USER LOGIN ROUTE 
userRoutes.post("/login", userLogin)


//UPDATE USER DATA
userRoutes.get("/update/:id", userUpdateData)






module.exports = { userRoutes }


