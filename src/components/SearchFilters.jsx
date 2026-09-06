/* eslint-disable react/prop-types */
import DropDownFilter from "./DropDownFilter";
import { Button } from "./ui/button";

function SearchFilters({ className = "", searchState }) {
  const {
    province,
    setProvince,
    setCity,
    propertyType,
    setPropertyType,
    setMinPrice,
    setMaxPrice,
    provinces,
    cities,
    propertyTypes,
    prices,
  } = searchState;

  return (
    <div>
      <div
        className={`wrapper grid grid-cols-2 md:grid-cols-5 md:grid-flow-col gap-2 items-center w-full justify-between ${className}`}
      >
        {/* Province */}
        <DropDownFilter
          type={"province"}
          data={provinces}
          onChange={setProvince}
        />

        {/* city */}
        <DropDownFilter
          type={"city"}
          data={cities}
          selectedProvince={province}
          onChange={setCity}
        />

        {/* property type */}
        <DropDownFilter
          type={"property type"}
          data={propertyTypes.filter((type) => type !== "Any")}
          onChange={setPropertyType}
        />

        {/* min price */}
        <DropDownFilter
          type={"min price"}
          data={prices}
          onChange={setMinPrice}
        />

        {/* max price */}
        <DropDownFilter
          type={"max price"}
          data={prices}
          onChange={setMaxPrice}
        />

      </div>
        <div className="col-span-2 flex flex-wrap items-center gap-2 pt-2 md:col-span-5">
          <span className="mr-1 text-sm font-medium text-gray-600">
            Property type
          </span>
          {propertyTypes.map((type) => {
            const value = type;
            const isSelected = propertyType === value;

            return (
              <Button
                key={type}
                type="button"
                variant={isSelected ? "default" : "outline"}
                className={`h-9 rounded-full px-4 ${isSelected ? "bg-gray-900 text-white hover:bg-gray-800" : "text-gray-600"}`}
                onClick={() => setPropertyType(value)}
                aria-pressed={isSelected}
              >
                {type === "Any" ? "All" : type}
              </Button>
            );
          })}
        </div>
    </div>
  );
}

export default SearchFilters;
