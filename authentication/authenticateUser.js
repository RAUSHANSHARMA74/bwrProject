const { UsersModel } = require("../model/usersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let authorizationUser = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.send({ message: "Not Authorized 1" });
    return;
  } else {
    try {
      var decoded = jwt.verify(token, process.env.secret);
      if (!decoded) {
        res.send({ message: "Not Authorized 2" });
      } else {
        let userDetail = await UsersModel.findOne({
          where : {
            email : decoded.email
          }
        })
        if (userDetail != null) {
          req.body["userDetail"] = userDetail;
          next();
        } else {
          res.send({ message: "Not Authorized 3" });
        }
      }
    } catch (error) {
      res.send({ message: "Token Invalid" });
    }
  }
};

module.exports = { authorizationUser };