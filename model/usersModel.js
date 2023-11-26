const Sequelize = require("sequelize");
const { sequelizeConnection } = require("../config/connection");

const UsersModel = sequelizeConnection.define("UserDetails", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
    },
    user_id : {
        type : Sequelize.STRING,
        allowNull : false,
        primaryKey: true, 
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    profilePicture: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, 
    },
    favourite: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    otp : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    otpVerify : {
        type: Sequelize.STRING,
        defaultValue : false,
    },
});

module.exports = { UsersModel };
