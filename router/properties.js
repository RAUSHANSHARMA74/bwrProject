const express = require("express");
const { PropertiesModel } = require("../model/propertiesModel");
const propertiesRoutes = express.Router();
const NodeCache = require("node-cache");
const { Op , Sequelize} = require("sequelize");

const myCache = new NodeCache();


//API => http://localhost:5003/api/properties
//GET ALL PROPERTIES DATA 
propertiesRoutes.get("/properties", async (req, res) => {
  try {
    let propertiesData;

    if (myCache.has("AllProperties")) {
      propertiesData = JSON.parse(myCache.get("AllProperties"));
    } else {
      propertiesData = await PropertiesModel.findAll();

      myCache.set("AllProperties", JSON.stringify(propertiesData));
    }

    if (propertiesData.length > 0) {
      res.status(200).json({
        isError: false,
        message: "Successfully retrieved all properties data",
        dataLength: propertiesData.length,
        propertiesData,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: "No properties data found",
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});


//API => http://localhost:5003/api/properties/pagination?item=8&page=1
propertiesRoutes.get("/properties/pagination", async (req, res) => {
  try {
    let { item, page } = req.query;
    page = page || 1;
    item = item || 12; 
    const offset = (page - 1) * item;
    console.log(typeof page, typeof item, typeof offset)
    const propertiesData = await PropertiesModel.findAll({
      limit: Number(item), 
      offset: offset,
    });

    if (propertiesData.length > 0) {
      res.status(200).json({
        isError: false,
        message: "Successfully retrieved properties data",
        currentPage: page,
        dataLength: propertiesData.length,
        propertiesData,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: "No properties data found",
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties/pagination route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});



//API => http://localhost:5003/api/properties/query?location=Checkpost, Don Bosco Colony, Siliguri
//GET ALL PROPERTIES DATA BY SEARCH CRITERIA
propertiesRoutes.get("/properties/query", async (req, res) => {
  try {
    const searchParameters = req.query;
    const allPropertiesData = await PropertiesModel.findAll({
      where: searchParameters,
    });

    if (allPropertiesData.length > 0) {
      res.status(200).json({
        isError: false,
        message:
          "Successfully retrieved properties data based on search criteria",
        dataLength: allPropertiesData.length,
        propertiesData: allPropertiesData,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: "No properties data found matching the search criteria",
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});



//API => http://localhost:5003/api/properties/51025992
propertiesRoutes.get("/properties/id/:id", async (req, res) => {
  try {

    let id = req.params.id
    let propertiesData = await PropertiesModel.findAll({
      where :{
        id_no : id
      }
    });

    if (propertiesData.length > 0) {
      res.status(200).json({
        isError: false,
        message: "Successfully retrieved all properties data",
        dataLength: propertiesData.length,
        propertiesData,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: "No properties data found",
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});


//API FOR PRICE => http://localhost:5003/api/properties/sort?exact_price=ASC/DESC
//API FOR AREA  => http://localhost:5003/api/properties/sort?area=ASC/DESC
//API FOR DATE => http://localhost:5003/api/properties/sort?date=DESC/ASC
// SORT PROPERTIES BY PRICE AND AREA BOTH (Low to High and High to Low)
propertiesRoutes.get("/properties/sort", async (req, res) => {
  try {
    const keyValueArray = Object.entries(req.query);
    console.log(keyValueArray)

    for (const [key, value] of keyValueArray) {
      if (value !== "ASC" && value !== "DESC") {
        return res.status(400).json({
          isError: true,
          message: `Invalid sort order for key: ${key}. Use 'ASC' or 'DESC'.`,
        });
      }
    }
    
    const orderCriteria = keyValueArray.map(([key, value]) => {
      if (key === "date") {
        // For date, use sequelize.literal to handle the raw SQL expression
        return [Sequelize.literal(`DATE(${key})`), value];
      } else {
        return [key, value];
      }
    });

    const propertiesDataSort = await PropertiesModel.findAll({
      order: orderCriteria,
    });

    if (propertiesDataSort.length > 0) {
      res.status(200).json({
        isError: false,
        message: "Successfully retrieved properties data using sorting",
        dataLength: propertiesDataSort.length,
        propertiesData: propertiesDataSort,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: "No properties data found for the specified sorting criteria.",
      });
    }
  } catch (error) {
    console.log("Something went wrong in properties/sort route", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});

//API FOR PRICE => http://localhost:5003/api/properties/range/exact_price?low=300&high=6000
//API FOR AREA  => http://localhost:5003/api/properties/range/area?low=300&high=6000
//GET ALL RANGE OF PRICE AND AREA OF ALL DATA
propertiesRoutes.get("/properties/range/:range", async (req, res) => {
  try {
    const { low, high } = req.query;

    if (!low || !high) {
      return res.status(400).json({
        isError: true,
        message:
          "Please provide both 'low' and 'high' price values in the query parameters.",
      });
    }

    const range = req.params.range;
    const whereClause = {
      [range]: {
        [Op.between]: [low, high],
      },
    };

    const propertiesDataByPriceRange = await PropertiesModel.findAll({
      where: whereClause,
    });

    if (propertiesDataByPriceRange.length > 0) {
      res.status(200).json({
        isError: false,
        message:
          "Successfully retrieved properties data within the specified price range",
        dataLength: propertiesDataByPriceRange.length,
        propertiesData: propertiesDataByPriceRange,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: "No properties data found within the specified price range.",
      });
    }
  } catch (error) {
    console.error(
      "Something went wrong in properties/priceRange route:",
      error
    );
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});

//API => http://localhost:5003/api/properties/search?keyword=&category=Warehouse&location=Road
//search by keyword, category, location
propertiesRoutes.get("/properties/search", async (req, res) => {
  try {
    const { keyword, category, location } = req.query;
    const whereClause = {};

    if (category) {
      whereClause.category = category;
    }
    if (location) {
      whereClause.location = {
        [Op.like]: `%${location}%`,
      };
    }
    if (keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { property_type: { [Op.like]: `%${keyword}%` } },
        { city: { [Op.like]: `%${keyword}%` } },
        { state: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
        { no_of_bedroom: { [Op.like]: `%${keyword}%` } },
        { no_of_bathroom: { [Op.like]: `%${keyword}%` } },
      ];
    }

    const propertiesData = await PropertiesModel.findAll({
      where: whereClause,
    });

    if (propertiesData.length > 0) {
      res.status(200).json({
        isError: false,
        message:
          "Successfully retrieved properties data based on search criteria",
        dataLength: propertiesData.length,
        propertiesData: propertiesData,
      });
    } else {
      res.status(200).json({
        isError: false,
        message: "No properties data found for the specified search criteria",
      });
    }
  } catch (error) {
    console.error(
      "Something went wrong in the /properties/search route:",
      error
    );
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});


//API => http://localhost:5003/api/properties/category/Residential
//GET ALL PROPERTIES DATA BY CATEGORY
propertiesRoutes.get("/properties/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const categoryData = await PropertiesModel.findAll({
      where: {
        category,
      },
    });

    if (categoryData.length > 0) {
      res.status(200).json({
        isError: false,
        message: `Successfully retrieved properties data for category: ${category}`,
        dataLength: categoryData.length,
        propertiesData: categoryData,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: `No properties data found for category: ${category}`,
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});


//API => http://localhost:5003/api/properties/query/Residential?location=Salugara, Siliguri
//GET ALL PROPERTIES DATA BY CATEGORY OF ITS SEARCH CRITERIA
propertiesRoutes.get("/properties/query/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const searchParameters = req.query;
    const categoryData = await PropertiesModel.findAll({
      where: {
        category,
        ...searchParameters,
      },
    });

    if (categoryData.length > 0) {
      res.status(200).json({
        isError: false,
        message: `Successfully retrieved properties data for category: ${category}`,
        dataLength: categoryData.length,
        propertiesData: categoryData,
      });
    } else {
      res.status(200).json({
        isError: false,
        message: `No properties data found for category: ${category}`,
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});


//API => http://localhost:5003/api/properties/sort/Residential?exact_price=ASC
//API => http://localhost:5003/api/properties/sort/Residential?area=ASC
// SORT PROPERTIES BY CATEGORY AND APPLY SORTING CRITERIA
propertiesRoutes.get("/properties/sort/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const keyValueArray = Object.entries(req.query);

    for (const [key, value] of keyValueArray) {
      if (value !== "ASC" && value !== "DESC") {
        return res.status(400).json({
          isError: true,
          message: `Invalid sort order for key: ${key}. Use 'ASC' or 'DESC'.`,
        });
      }
    }

    const propertiesDataSort = await PropertiesModel.findAll({
      where: { category },
      order: keyValueArray,
    });

    if (propertiesDataSort.length > 0) {
      res.status(200).json({
        isError: false,
        message: `Successfully retrieved properties data for category: ${category} using sorting`,
        dataLength: propertiesDataSort.length,
        propertiesData: propertiesDataSort,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: `No properties data found for category: ${category} with the specified sorting criteria.`,
      });
    }
  } catch (error) {
    console.log("Something went wrong in properties/sort route", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});


//API => http://localhost:5003/api/properties/range/Residential/exact_price?low=300&high=600
//API => http://localhost:5003/api/properties/range/Residential/area?low=300&high=600
//GET RANGE OF PRICE AND AREA WITH SPECIFIC CATEGORY
propertiesRoutes.get("/properties/range/:category/:range", async (req, res) => {
  try {
    const { low, high } = req.query;

    if (!low || !high) {
      return res.status(400).json({
        isError: true,
        message:
          "Please provide both 'low' and 'high' price values in the query parameters.",
      });
    }

    const range = req.params.range;
    const category = req.params.category;
    const whereClause = {
      category,
      [range]: {
        [Op.between]: [low, high],
      },
    };

    const propertiesDataByPriceRange = await PropertiesModel.findAll({
      where: whereClause,
    });

    if (propertiesDataByPriceRange.length > 0) {
      res.status(200).json({
        isError: false,
        message:
          "Successfully retrieved properties data within the specified price range",
        dataLength: propertiesDataByPriceRange.length,
        propertiesDataByPriceRange,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: "No properties data found within the specified price range.",
      });
    }
  } catch (error) {
    console.error(
      "Something went wrong in properties/priceRange route:",
      error
    );
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});



module.exports = { propertiesRoutes };
