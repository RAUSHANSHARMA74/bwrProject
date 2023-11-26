const Sequelize = require("sequelize");
const { sequelizeConnection } = require("../config/connection");

const AdminModel = sequelizeConnection.define("AdminDetails", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true, 
    },
    user_id : {
        type : Sequelize.INTEGER,
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
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    otpVerify : {
        type: Sequelize.STRING,
        defaultValue : false,
    },
});

module.exports = { AdminModel };
