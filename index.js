const express = require("express");
const { sequelizeConnection } = require("./config/connection");
const {propertiesRoutes} = require("./router/properties")
const {userRoutes} = require("./router/userRoute")
const {adminRoutes} = require("./router/adminRoute")
const cors = require("cors")

require("dotenv").config();
const app = express();
app.use(cors())
app.use(express.json());

app.use("/api", adminRoutes, propertiesRoutes)
app.use("/user", userRoutes)

const port = process.env.port || 5006;
sequelizeConnection.sync().then(async () => {
  try {
    app.listen(port, () => {
      console.log(`server is running on port ${port}\nhttp://localhost:${port}/`);
    });
  } catch (error) {
    console.log("something went wrong in Database connection");
  }
});
