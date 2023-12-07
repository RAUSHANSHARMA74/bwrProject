import { useState, useEffect, useRef } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { BsCurrencyRupee, BsTextarea } from "react-icons/bs";
import "./Property.css";
import { PhoneNumber } from "google-libphonenumber";
import { Link } from "react-router-dom";
let url = "http://localhost:5003";
//http://localhost:5003/api/properties/pagination?item=8&page=1

function Card({ filter, setFilter }) {
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btn, setBtn] = useState(null);
  // const isMounted = useRef(true);
  let count;

  const fetchData = async (apiEndpoint) => {
    try {
      const response = await fetch(`${url}${apiEndpoint}`);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        // console.log(data.propertiesData);
        setPropertyData(data);
        setBtn(data.totalPages);
      } else {
        console.log({
          message: "Request failed with status: " + response.status,
        });
      }
    } catch (error) {
      console.error({
        message: "Something went wrong while fetching data",
        error,
      });
    } finally {
      setLoading(false);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 2000);
    }
  };
  useEffect(() => {
    let {
      keyword,
      city,
      category,
      property_type,
      bedrooms,
      order,
      type,
      page,
      price_range,
      area_range,
    } = filter;
    fetchData(
      `/api/properties/search?keyword=${keyword}&category=${category}&location=${city}&property_type=${property_type}&bedrooms=${bedrooms}&order=${order}&type=${type}&price_range=${price_range}&area_range=${area_range}&page=${page}`
    );
  }, [filter]);

  const handleId = (e) => {
    let id = e.target.dataset.id;
    console.log(id);
  };

  const handleChangeItem = (e) => {
    const pageNumber = e.target.dataset.id;
    console.log(pageNumber);

    setFilter((prevFilter) => ({
      ...prevFilter,
      page: pageNumber,
    }));
    console.log(filter);
  };

  const handleSortChange = async (e) => {
    const selectedValue = e.target.value;
    const [order, type] = selectedValue.split(" ");
    setFilter((prevFilter) => ({
      ...prevFilter,
      order,
      type,
    }));
  };

  const handleNext = () => {
    if (count++ >= Number(btn)) {
      count--;
      return;
    }
    console.log(count);

    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   page: count,
    // }));
  };

  const handlePrevious = () => {
    if (count-- <= 1) {
      count++;
      return;
    }
    console.log(count);

    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   page: count
    // }));
  };

  return (
    <>
      <div className="filter_data flex justify-end align-middle lg:w-11/12 border border-grey-200 rounded-lg mx-auto py-2 px-5 m-2">
        <select
          name="sortOrder"
          id="sortOrder"
          className="border border-gray-300 focus:outline-none focus:border-blue-500 text-xl rounded-md ml-20 p-2"
          value={`${filter.order} ${filter.type}`}
          onChange={handleSortChange}
        >
          <option value="empty empty">Select Sort</option>
          <option value="DESC date">Recent Properties</option>
          <option value="DESC exact_price">High to Low Price</option>
          <option value="ASC exact_price">Low to High Price</option>
          <option value="DESC area">High to Low Area</option>
          <option value="ASC area">Low to High Area</option>
        </select>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          {/* <div class="custom-loader"></div> */}
          <span className="loader"></span>
        </div>
      ) : (
        <div className="card_container">
          <div className="all_card overflow-y-auto w-full lg:w-11/12  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto  ">
            {propertyData?.propertiesData?.map((item, index) => (
              <div
                key={index}
                className="w-full  bg-white border border-grey-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="relative group">
                  <a
                    href="#"
                    className="block group-hover:opacity-90 transition-opacity"
                  >
                    <div className="relative">
                      <img
                        className="p-4 rounded-md"
                        src="/assets/images/properties.jpg"
                        alt="product image"
                      />
                      <div className="absolute top-0 left-0 ml-4 mt-4 flex items-center">
                        <span className="text-white bg-blue-500 p-1 rounded">
                          {item.property_type ?? ""}
                        </span>
                      </div>
                    </div>
                  </a>
                  <div className="absolute top-4 right-4 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaRegHeart className="text-gray-300 text-3xl hover:text-red-500 cursor-pointer" />
                  </div>
                </div>

                <div className="px-4">
                  <div className="prupose flex justify-between align-middle my-2">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.category}
                    </h5>
                    <h5
                      className=" text-xl
                     font-semibold
                     tracking-tight
                     text-gray-900
                     dark:text-white"
                    >
                      {item.purpose}
                    </h5>
                  </div>

                  <div className="description h-20 flex items-center">
                    <h5 className="font-semibold tracking-tight text-gray-600 dark:text-white">
                      {item.description}
                    </h5>
                  </div>

                  <div className="location flex items-center justify-start">
                    <CiLocationOn className="text-xl" />
                    <span className="font-semibold text-xl tracking-tight text-gray-600 dark:text-white ml-2">
                      {item.location}
                    </span>
                  </div>

                  {/* <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {[...Array(4)].map((_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      {[...Array(1)].map((_, index) => (
                        <svg
                          className="w-4 h-4 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      5.0
                    </span>
                  </div> */}
                  <div className="flex items-center justify-between align-middle pb-5">
                    <div className="range_Detail">
                      <div className="area_range flex items-center justify-start">
                        <BsTextarea />
                        <span className=" text-sm lg:text-lg  font-bold text-blue-500 dark:text-white block ml-2">
                          {item.area_range && item.area_range.length > 1
                            ? item.area_range[0] + " - " + item.area_range[1]
                            : item.area}
                        </span>
                        <span className="text-sm lg:text-lg  font-bold text-blue-500 dark:text-white ml-2">
                          {item.area_unit}
                        </span>
                      </div>
                      <div className="price_range flex items-center justify-start">
                        <BsCurrencyRupee />
                        <span className="text-sm lg:text-lg  font-bold text-blue-500 dark:text-white ml-2">
                          {item.price_range && item.price_range.length > 1
                            ? item.price_range[0] + " - " + item.price_range[1]
                            : item.exact_price}
                        </span>
                        <span className="text-sm lg:text-lg  font-bold text-blue-500 dark:text-white ml-2">
                          {item.price_unit}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={"/PropertyDetailPage"}
                      data-id={item.id_no}
                      onClick={handleId}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 lg:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )) || (
              <div className="items-center col-span-3 flex justify-center h-screen">
                <span className="message text-2xl font-bold ">
                  {propertyData?.message || "Data is not available"}
                </span>
              </div>
            )}
          </div>

          {btn > 1 ? (
            <nav
              aria-label="Page navigation example"
              className="all_btn flex justify-center align-middle pt-5"
            >
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <a
                    onClick={handlePrevious}
                    href="#"
                    className="flex text-2xl items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </a>
                </li>
                {Array.from({ length: btn }, (_, index) => (
                  <button
                    onClick={handleChangeItem}
                    type="button"
                    data-id={index + 1}
                    className="flex items-center text-2xl justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    key={index}
                  >
                    {index + 1}
                  </button>
                ))}

                <li>
                  <a
                    href="#"
                    onClick={handleNext}
                    className="flex text-2xl items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Card;

// console.log(item.city),
