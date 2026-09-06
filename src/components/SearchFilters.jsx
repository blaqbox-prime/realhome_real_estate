import React, { useState } from "react";
import DropDownFilter from "./DropDownFilter";
import { citiesOptions, priceOptions, provincesOptions } from "@/lib/utils";
import { Button } from "./ui/button";
import { FaSearch } from "react-icons/fa";
import { useFilterStore, usePropertiesStore } from "@/zustand/store";
import { getProperties } from "@/services/propertyService";
import { ThreeDots } from "react-loader-spinner";




function SearchFilters({ className = "" }) {
  const setProperties = usePropertiesStore((state) => state.setProperties);
  const setPropertiesLoading = usePropertiesStore((state) => state.setPropertiesLoading);
  const setPropertiesError = usePropertiesStore((state) => state.setPropertiesError);
  const changeProvince = useFilterStore((state) => state.changeProvince);
  const changeCity = useFilterStore((state) => state.changeCity);
  const changePropertyType = useFilterStore(
    (state) => state.changePropertyType
  );
  const changeMinPrice = useFilterStore((state) => state.changeMinPrice);
  const changeMaxPrice = useFilterStore((state) => state.changeMaxPrice);

  const selectedProvince = useFilterStore((state) => state.province);

  const province = useFilterStore((state) => state.province);
  const city = useFilterStore((state) => state.city);
  const propertyType = useFilterStore((state) => state.propertyType);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);

  const [loading, setLoading] = useState(false);

  const handleSearchClick = async () => {
    setLoading(true);
    setPropertiesLoading(true);

    let query = getProperties().range(0, 49);

    if (province !== "Any") query = query.eq("province", province);
    if (city !== "Any") query = query.eq("city", city);
    if (propertyType !== "Any") query = query.eq("property_type", propertyType);
    if (minPrice !== "Any") query = query.gte("price", Number(minPrice));
    if (maxPrice !== "Any") query = query.lte("price", Number(maxPrice));

    const { data, error } = await query;

    if (error) {
      setPropertiesError(error);
    } else {
      setProperties(data ?? []);
      setPropertiesLoading(false);
    }

    setLoading(false);
  };

  return (
    <div
      className={`wrapper grid grid-cols-2 md:grid-cols-5 md:grid-flow-col gap-2 items-center w-full justify-between ${className}`}
    >
      {/* Province */}
      <DropDownFilter
        type={"province"}
        selectedProvince={selectedProvince}
        data={provincesOptions}
        onChange={changeProvince}
      />

      {/* city */}
      <DropDownFilter
        type={"city"}
        data={citiesOptions}
        selectedProvince={selectedProvince}
        onChange={changeCity}
      />

      {/* property type */}
      <DropDownFilter
        type={"property type"}
        data={["House", "Apartment", "Townhouse"]}
        onChange={changePropertyType}
      />

      {/* min price */}
      <DropDownFilter
        type={"min price"}
        data={priceOptions}
        onChange={changeMinPrice}
      />

      {/* max price */}
      <DropDownFilter
        type={"max price"}
        data={priceOptions}
        onChange={changeMaxPrice}
      />
      <Button className="flex items-center gap-4" onClick={handleSearchClick} type="submit" disabled={loading}>{loading ? (<ThreeDots
  visible={true}
  width={80}

  color="#fff"
  radius="2"
  ariaLabel="three-dots-loading"
  />) : <>Search <FaSearch /></>}</Button>
    </div>
  );
}

export default SearchFilters;
