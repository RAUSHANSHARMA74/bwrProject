const { UsersModel } = require("../model/usersModel")
// const { uuid } = require('uuidv4');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const otpGenerator = require('otp-generator')
const { sendMail } = require("../mailSender/mailSender")





//GENERATE OTP 
let otpGeneratorFunction = () => {
  return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
}


//GENERATE RANDOM NUMBER JUST LIKE ID
let randomIdGenerator = () => {
  return otpGenerator.generate(20, { upperCaseAlphabets: false, specialChars: false });
}





// USER REGISTER CONTROLLER
let userRegister = async (req, res) => {
  try {

    let { username, email, phoneNumber, password } = req.body;
    let userData = await UsersModel.findOne({ where: { email } });
    // console.log(req.body)
    let otp = otpGeneratorFunction()

    if (userData != null) {
      if (userData.otpVerify == false) {
        sendMail(email, username, otp)
        res.status(200).json({
          isError: false,
          otpVerify: userData.otpVerify,
          message: `You are Already My User Need To Verify OTP`,
        });
        return;
      } else {
        res.status(200).json({
          isError: false,
          message: "Email already registered, Need To Login",
        });
        return;
      }
    }
    bcrypt.hash(password, 6, async (err, hash_password) => {
      if (err) {
        res.status(404).json({
          isError: true,
          message: "Error while Hashing Password",
        });
      } else {
        let data = await UsersModel.create({ user_id: randomIdGenerator(), username, email, phoneNumber, password: hash_password, otp });
        //here i call the mail sender file and pass the arg
        sendMail(email, username, otp)

        res.status(200).json({
          isError: false,
          message: `registration successfull`,
        });
      }

    });

  } catch (error) {
    console.log(error)
    res.status(404).json({
      isError: true,
      message: "error while register user",
    });
  }
};


//USER OTP VERIFICATION
let userOtpVerification = async (req, res) => {
  try {
    let { email, otp } = req.body;
    let userData = await UsersModel.findOne({ where: { email } });

    if (userData == null) {
      return res.status(404).json({
        isError: true,
        message: "User data not found",
      });
    }

    if (userData.otp !== otp) {
      return res.status(400).json({
        isError: true,
        message: "Incorrect OTP. Please provide the correct OTP.",
      });
    }

    // Update the user's otpVerify status to true
    userData.otpVerify = true;
    await userData.save();

    res.status(200).json({
      isError: false,
      message: "Successfully verified your OTP",
    });
  } catch (error) {
    console.error("Something went wrong in user OTP verification:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
}





// USER LOGIN CONTROLLER
let userLogin = async (req, res) => {
  let { email, password } = req.body;
  try {
    let check = await UsersModel.findOne({ where: { email } });
    let otp = otpGeneratorFunction()
    if (check != null) {
      if(check.otpVerify == false){
        sendMail(check.email, check.username, otp)
        res.status(200).json({
          isError: false,
          otpVerify: check.otpVerify,
          message: `You are Already My User Need To Verify OTP`,
        });
        return;
      }
      bcrypt.compare(password, check.password, async (err, result) => {
        if (result) {
          //GENERATE TOKEN HERE 
          let token = jwt.sign({ email: check.email, username:check.username }, process.env.secret, { expiresIn: "7d", });

          res.status(200).json({
            message: `${check.username} is successfully logged in`,
            username: check.username,
            Access_Token: token,
          });

        } else {
          res.status(404).json({
            isError: true,
            message: "Wrong Credentials",
          });
        }
      });
    } else {
      res.send({ message: "Wrong Credentials" });
    }
  } catch (error) {
    console.log(error)
    res.send({ message: "Something Went Wrong" });
  }
};



let userUpdateData = async (req, res) => {
  try {
    let userId = req.params.id;
    let userUpdateData = req.body;


  } catch (error) {
    console.log("something went wrong in update user Data")
  }
}




module.exports = { userRegister, userLogin, userOtpVerification, userUpdateData }