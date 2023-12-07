function Filter({ filter, setFilter, initialData }) {
  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.id]: e.target.value,
    });
  };

  const handlePriceChange = (e) => {
    const { id, value } = e.target;

    setFilter((prevFilter) => ({
      ...prevFilter,
      price_range:
        id === "lowPrice"
          ? [Number(value) , prevFilter.price_range[1]]
          : [prevFilter.price_range[0], Number(value)],
    }));
  };

  const handleAreaChange = (e) => {
    const { id, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      area_range:
        id === "lowArea"
          ? [Number(value), prevFilter.area_range[1]]
          : [prevFilter.area_range[0], Number(value) ],
    }));
  };

  const handleResetValue = () =>{
    setFilter(initialData)
    console.log(initialData)
  }

  const handleFilterFunction = () =>{
    setFilter((prevFilter) => ({
      ...prevFilter 
    }));
  }

  return (
    <section id="filter" className="bg-gray-200 p-4 w-full sticky top-0 lg:h-screen ">
      <div className="inside">
        <h4 className="text-3xl font-semibold mb-6">Filter</h4>
        <div className="filterFunctionality  ">
          <div className="keyword md:my-4 lg:my-6">
            <span className="block font-semibold mb-2">Keyword</span>
            <input
              className=" w-full p-1 "
              type="text"
              name=""
              id="keyword"
              placeholder="Enter Keyword"
              onChange={handleChange}
            />
          </div>
          <div className="city md:my-4 lg:my-6">
            <span className="block font-semibold mb-2">City</span>
            <select
              name="city"
              className="filters city w-full border p-1 lg:p-2 rounded"
              value={filter.city}
              id="city"
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="Fulbari">Fulbari</option>
              <option value="Punjabipara">Punjabipara</option>
              <option value="Gossaipur">Gossaipur</option>
              <option value="Matigara">Matigara</option>
              <option value="Ustodhaara">Ustodhaara</option>
            </select>
          </div>
          <div className="property_category md:my-4 lg:my-6">
            <span className="block font-semibold mb-1">Property Category</span>
            <select
              name="homeType"
              className="filters homeType w-full border p-1 lg:p-2 rounded"
              id="category"
              onChange={handleChange}
            >
              <option value="">All Category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Landplot">Landplot</option>
            </select>
          </div>
          <div className="property_type md:my-4 lg:my-6">
            <span className="block font-semibold mb-1">Property Type</span>
            <select
              name="homeType"
              className="filters homeType w-full border p-1 lg:p-2 rounded"
              id="property_type"
              onChange={handleChange}
            >
              <option value="">All Homes</option>
              <option value="Showroom space">Showroom space</option>
              <option value="Office space">Office space</option>
              <option value="Shop space">Shop space</option>
            </select>
          </div>

          <div className="bedroom md:my-4 lg:my-6">
            <span className="block font-semibold mb-1">Bedrooms</span>
            <select
              name="bedrooms"
              className="filters bedrooms w-full border p-1 lg:p-2 rounded"
              id="bedrooms"
              onChange={handleChange}
            >
              <option value="">Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="filters price md:my-4 lg:my-6">
            <span className="block font-semibold mb-1">Price Range</span>
            <div className="priceRange flex justify-between align-middle">
              <input
                type="text"
                name="min_price"
                className="min-price w-5/12 border outline-none p-1 lg:p-2 rounded"
                value={filter.price_range[0]}
                readOnly
              />
              <input
                type="text"
                name="max_price"
                className="max-price w-5/12 border outline-none p-1 lg:p-2 rounded"
                value={filter.price_range[1]}
                readOnly
              />
            </div>
            <div className="select_price_range flex justify-between align-middle md:my-2 lg:my-4">
              <input
                type="range"
                className=" w-5/12 "
                name=""
                min="1"
                max="100000"
                id="lowPrice"
                onChange={handlePriceChange}
              />
              <input
                type="range"
                className=" w-5/12 "
                name=""
                min="1000001"
                max="100000000"
                id="highPrice"
                onChange={handlePriceChange}
              />
            </div>
          </div>
          <div className="filters floor-space md:my-4 lg:my-6">
            <span className="block font-semibold mb-2">Area Range</span>
            <div className="areaRange flex justify-between align-middle">
              <input
                type="text"
                name="min_floor_space"

                className="min-floor-space w-5/12 border outline-none p-1 lg:p-2 rounded"
                value={filter.area_range[0]}
                readOnly
              />
              <input
                type="text"
                name="max_floor_space"
                className="max-floor-space w-5/12 border outline-none p-1 lg:p-2 rounded"
                value={filter.area_range[1]}
                readOnly
              />
            </div>
            <div className="select_area_range flex justify-between align-middle md:my-2 lg:my-4">
              <input
                type="range"
                className=" w-5/12 "
                name=""
                min="1"
                max="1000"
                id="lowArea"
                onChange={handleAreaChange}
              />
              <input
                type="range"
                className=" w-5/12 "
                name=""
                min="10001"
                max="1000000"
                id="highArea"
                onChange={handleAreaChange}
              />
            </div>
          </div>
          <div className="all_btn flex justify-between my-4 md:my-6 lg:my-10">
            <button
              type="button"
              onClick={handleResetValue}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-4 py-2 w-5/12 text-center "
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleFilterFunction}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-4 py-2 w-5/12 text-center "
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filter;
