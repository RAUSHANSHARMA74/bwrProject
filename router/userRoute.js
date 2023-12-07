const express = require("express");
const userRoutes = express.Router();
const {
  userRegister,
  userOtpVerification,
  userLogin,
  numberVerification,
  addToWishlists,
  getToWishlists,
  deleteToWishlists,
} = require("../controller/userLoginController");
const { UsersModel } = require("../model/usersModel");
const {PropertiesModel} = require("../model/propertiesModel")
const { authorizationUser } = require("../authentication/authenticateUser");


userRoutes.get("/users", async (req, res) => {
  try {
    let allUsers = await UsersModel.findAll();
    res.send(allUsers);
  } catch (error) {
    console.log("something went wrong in get all user");
  }
});

//USER REGISTER ROUTE
userRoutes.post("/register", userRegister);

//USER OTP VERIFICATION
userRoutes.post("/otpVerification", userOtpVerification);

//USER LOGIN ROUTE
userRoutes.post("/login", userLogin);



userRoutes.post("/numberVerification", numberVerification);

// Assuming you have the necessary imports and middleware set up
userRoutes.use(authorizationUser);


//add in wishlists data route
userRoutes.post("/addWishlists", addToWishlists);


//get to wishlists data route
userRoutes.get("/getWishlists", getToWishlists);


//delete to wishlists data route
userRoutes.delete("/deleteWishlists/:id", deleteToWishlists);


userRoutes.post("/brochure/:id", async (req, res) => {
  try {
    let id_no = req.params.id
    let brochureData = await PropertiesModel.findOne({
      where : {
        id_no
      }
    })
    res.send({ message: "working", brochureData });
  } catch (error) {
    console.error("Something went wrong in /phone:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = { userRoutes };


// {
//   "favouriteData" : {
//             "id": 3,
//             "id_no": 95282314,
//             "propertyId": 78645,
//             "title": "",
//             "category": "Warehouse",
//             "purpose": "rent/lease",
//             "premium": "0",
//             "property_type": "Warehouse",
//             "city": "Fulbari",
//             "state": "",
//             "zip_code": "",
//             "location": "Fulbari",
//             "description": "Warehouse available for rent",
//             "images": [
//                 {
//                     "url": "https://drive.google.com/file/d/1KHkz3TF5APoBsHUcp2DRjAXOSZKkhKSs/view?usp=drive_link",
//                     "caption": ""
//                 },
//                 {
//                     "url": "https://drive.google.com/file/d/1ajMtcXv7nYd5nzPnkj5hlLP6Wl7c3D-k/view?usp=drive_link",
//                     "caption": ""
//                 },
//                 {
//                     "url": "https://drive.google.com/file/d/1enByh3N1b84PrVh2slBw-N5gSNn46R7B/view?usp=drive_link",
//                     "caption": ""
//                 }
//             ],
//             "exact_price": "20",
//             "price_range": "",
//             "area": "22000",
//             "carpet_area": "22000",
//             "rate_per_sqft": "20",
//             "size": 22000,
//             "rating": "",
//             "built_up": "22000 sq.ft. apx.",
//             "googlepin": [
//                 "26.652351135972687",
//                 "88.4172609152178"
//             ],
//             "furnishing": "",
//             "possession_status": "Ready to move",
//             "no_of_bedroom": null,
//             "no_of_living_room": null,
//             "no_of_balcony": null,
//             "no_of_bathroom": null,
//             "no_of_kitchen": null,
//             "entrance_facing": "",
//             "booking_amount": "",
//             "floor_no": "Ground",
//             "amenities": [
//                 "isLift",
//                 "iscctv",
//                 "isPowerBackup",
//                 "24*7 security",
//                 "community hall",
//                 "park",
//                 "covered_car_parking",
//                 "open_parking_space",
//                 "Park",
//                 "Gymnasium",
//                 "kids_paly ground"
//             ],
//             "yearBuilt": null,
//             "ownership": "Freehold",
//             "ownerName": "",
//             "ownerContact": "",
//             "availability": "",
//             "propertyFeatures": [],
//             "nearbyFacilities": [],
//             "taxInformation": "",
//             "legalInformation": "",
//             "historicalData": [],
//             "agentName": "",
//             "agentContact": "",
//             "virtualTourLink": "",
//             "date": "2023-11-24T06:42:36.000Z",
//             "createdAt": "2023-11-25T11:44:33.000Z",
//             "updatedAt": "2023-11-25T11:44:33.000Z"
//         }
// }


