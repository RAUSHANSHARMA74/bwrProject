const Sequelize = require("sequelize");
const { sequelizeConnection } = require("../config/connection");

const PropertiesModel = sequelizeConnection.define("Properties", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_no : {
    type: Sequelize.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  propertyId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  purpose: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  premium: {
    type: Sequelize.STRING,
    default: false,
  },
  property_type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  zip_code: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  images: {
    type: Sequelize.JSON, // JSON array of images
    allowNull: true,
  },
  exact_price: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price_range: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  area: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  carpet_area: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rate_per_sqft: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  built_up: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  googlepin: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  furnishing: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  possession_status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  no_of_bedroom: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  no_of_living_room: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  no_of_balcony: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  no_of_bathroom: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  no_of_kitchen: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  entrance_facing: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  booking_amount: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  floor_no: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  amenities: {
    type: Sequelize.JSON, // JSON array of amenities
    allowNull: true,
  },
  yearBuilt: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ownership: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ownerName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ownerContact: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  availability: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  propertyFeatures: {
    type: Sequelize.JSON, // JSON array of property features
    allowNull: true,
  },
  nearbyFacilities: {
    type: Sequelize.JSON, // JSON array of nearby facilities
    allowNull: true,
  },
  taxInformation: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  legalInformation: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  historicalData: {
    type: Sequelize.JSON, // JSON array of historical data
    allowNull: true,
  },
  agentName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  agentContact: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  virtualTourLink: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  data: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = { PropertiesModel };
