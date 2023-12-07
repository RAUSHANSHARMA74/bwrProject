const { UsersModel } = require("../model/usersModel")
// const { uuid } = require('uuidv4');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const otpGenerator = require('otp-generator')
const {sendOtpOnMobileNumber} = require("../otpSender/mobileOtp")
// const { sendMail } = require("../mailSender/mailSender")
const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();





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
    // let otp = otpGeneratorFunction()

    if (userData != null) {
      res.status(200).json({
        isError: false,
        message: "Email already registered, Need To Login",
      });
      return;
      // if (userData.otpVerify == false) {
      //   sendMail(email, username, otp)
      //   res.status(200).json({
      //     isError: false,
      //     otpVerify: userData.otpVerify,
      //     message: `You are Already My User Need To Verify OTP`,
      //   });
      //   return;
      // } else {
      //   res.status(200).json({
      //     isError: false,
      //     message: "Email already registered, Need To Login",
      //   });
      //   return;
      // }
    }
    bcrypt.hash(password, 6, async (err, hash_password) => {
      if (err) {
        res.status(404).json({
          isError: true,
          message: "Error while Hashing Password",
        });
      } else {
        let data = await UsersModel.create({ user_id: randomIdGenerator(), username, email, phoneNumber, password: hash_password });
        // sendMail(email, username, otp)

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
    // let otp = otpGeneratorFunction()
    if (check != null) {
      // if(check.otpVerify == false){
      //   // sendMail(check.email, check.username, otp)
      //   res.status(200).json({
      //     isError: false,
      //     otpVerify: check.otpVerify,
      //     message: `You are Already My User Need To Verify OTP`,
      //   });
      //   return;
      // }
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


//user number verification 
//check phone number valid or not


function isValidMobileNumber(number) {
  try {
    const phoneNumber = phoneUtil.parse(number, 'IN');
    return phoneUtil.isValidNumber(phoneNumber);
  } catch (e) {
    return false;
  }
}

let numberVerification = async (req, res) => {
  try {
    const phoneNumber = req.body.number;
    if (!phoneNumber) {
      return res.status(400).send({ message: 'Phone number is required.' });
    }

    if (isValidMobileNumber(phoneNumber)) {
      return res.send({ message: 'The mobile number is valid.', mobile : sendOtpOnMobileNumber(phoneNumber) });
    } else {
      return res
        .status(400)
        .send({ message: 'The mobile number is not valid.' });
    }
  } catch (error) {
    console.error('Something went wrong in /phone:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};



//add in wishlists data
let addToWishlists = async (req, res) => {
  try {
    const { favouriteData, userDetail } = req.body;
    if (!userDetail) {
      return res.status(404).send({ message: "User not found" });
    }
    const { user_id, favourite } = userDetail;
    let array = [];
    array.push(favouriteData);

    if (favourite == null) {
      await UsersModel.update( 
        { favourite : array },
        { where: {user_id},}
        );
    } else {
      favourite.push(favouriteData)
      await UsersModel.update(
        { favourite },
        {
          where: { user_id },
        }
      );
    }

    res.status(200).send({
      message: "Product added to wishlist successfully",
      favourite: array.length,
    });
  } catch (error) {
    console.error("Something went wrong in /addWishlists:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

//get to wishlists data
let getToWishlists = async (req, res) => {
  try {
    let favourite = req.body.userDetail.favourite;
    res
      .status(200)
      .send({
        message: "Product get to wishlist successfully",
        favouriteLength : favourite.length,
        favourite,
      });
  } catch (error) {
    console.error("Something went wrong in /addWishlists:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

//delete to wishlists data 
let deleteToWishlists = async (req, res) => {
  try {
    let property_id = req.params.id;
    let userDetail = req.body.userDetail;
    let favouriteUpdate = userDetail.favourite.filter((item) => item.id_no != property_id);

    await UsersModel.update(
      { favourite: favouriteUpdate },
      {
        where: { user_id: userDetail.user_id },
      }
    );

    res.send({ message: "working", favouriteUpdate });
  } catch (error) {
    console.error("Something went wrong in /deleteWishlists:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}


module.exports = { 
  userRegister, 
  userLogin, 
  userOtpVerification,
  numberVerification,
  addToWishlists,
  getToWishlists,
  deleteToWishlists
 }