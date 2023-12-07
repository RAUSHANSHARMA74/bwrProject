import React from "react";
import { useState } from "react";
import Card from "./Card";
import Filter from "./Filter";

function PropertyCardPage() {
  const initialData = {
    keyword: "",
    city: "",
    category: "",
    property_type: "",
    bedrooms: "",
    order: "",
    type: "",
    page: 1,
    price_range: [1, 100000000],
    area_range: [1, 1000000],
  };

  const [filter, setFilter] = useState(initialData);
  // console.log(filter);
  return (
    <div className="propertyCardPage w-full justify-between lg:flex p-2">
      <div className="filter lg:w-3/12">
        <Filter
          filter={filter}
          setFilter={setFilter}
          initialData={initialData}
        />
      </div>
      <div className="card lg:w-9/12 overflow-hidden ">
        <div className="overflow-y-auto h-full">
          <Card filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </div>
  );
}

export default PropertyCardPage;
