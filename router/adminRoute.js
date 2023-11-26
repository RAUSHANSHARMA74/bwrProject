const express = require("express")
const adminRoutes = express.Router()
const { Op } = require("sequelize"); 
const { PropertiesModel } = require("../model/propertiesModel")
const { userModel } = require("../model/usersModel");
const NodeCache = require("node-cache");
const otpGenerator = require('otp-generator')

const myCache = new NodeCache();


let numberGeneratorFunction = () => {
    return otpGenerator.generate(8, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
}


//ADD Properties DATA
adminRoutes.post("/properties", async (req, res) => {
    try {
        const newPropertiesData = req.body; 
        
        let id_no = numberGeneratorFunction()
        newPropertiesData["id_no"] = id_no

        const createdProperties = await PropertiesModel.create(newPropertiesData);


        res.status(201).json({
            isError: false,
            message: "Successfully added Properties data",
            dataLength : createdProperties.length,
            addedProperties: createdProperties, 
        });
    } catch (error) {
        console.error("Something went wrong in /Properties route:", error);
        res.status(500).json({
            isError: true,
            message: "Failed to add Properties data",
            error: error.message, 
        });
    }
});


// UPDATE Properties  DATA
adminRoutes.patch("/properties/:id", async (req, res) => {
    try {
        const updatePropertiesDataId = req.params.id;
        const updatedData = req.body;

        const PropertiesData = await PropertiesModel.update(updatedData, {
            where: {
                id_no: updatePropertiesDataId
            }
        });

        if (PropertiesData[0] === 1) {
            res.status(200).json({
                isError: false,
                message: "Successfully updated Properties data",
            });
        } else {
            res.status(404).json({
                isError: true,
                message: "Property not found",
            });
        }
    } catch (error) {
        console.error("Something went wrong in /Properties route:", error);
        res.status(500).json({
            isError: true,
            message: "Failed to update Properties data",
            error: error.message,
        });
    }
});



// DELETE Properties  DATA
adminRoutes.delete("/properties/:id", async (req, res) => {
    try {
        const deletePropertiesDataId = req.params.id;

        const propertiesData = await PropertiesModel.destroy({
            where: {
                id_no: deletePropertiesDataId,
            },
        });

        if (propertiesData) {
            res.status(200).json({
                isError: false,
                message: "Successfully deleted Properties data",
            });
        } else {
            res.status(404).json({
                isError: true,
                message: "Properties data not found",
            });
        }
    } catch (error) {
        console.error("Something went wrong in /properties route:", error);
        res.status(500).json({
            isError: true,
            message: "Failed to delete Properties data",
            error: error.message,
        });
    }
});




module.exports = {adminRoutes}



















