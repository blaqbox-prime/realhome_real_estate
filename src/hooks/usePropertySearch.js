import { useMemo, useState } from "react";

const ANY_OPTION = "Any";

const compareText = (firstValue, secondValue) =>
  firstValue.localeCompare(secondValue, undefined, { sensitivity: "base" });

const getUniqueOptions = (values) => [
  ANY_OPTION,
  ...new Set(values.filter(Boolean).sort(compareText)),
];

function usePropertySearch({ properties = [] } = {}) {
  const [province, setProvince] = useState(ANY_OPTION);
  const [city, setCity] = useState(ANY_OPTION);
  const [propertyType, setPropertyType] = useState(ANY_OPTION);
  const [minPrice, setMinPrice] = useState(ANY_OPTION);
  const [maxPrice, setMaxPrice] = useState(ANY_OPTION);

  const provinces = useMemo(
    () => getUniqueOptions(properties.map((property) => property?.province)),
    [properties],
  );

  const cities = useMemo(
    () =>
      getUniqueOptions(
        properties
          .filter((property) => province === ANY_OPTION || property?.province === province)
          .map((property) => property?.city),
      ),
    [properties, province],
  );

  const propertyTypes = useMemo(
    () => getUniqueOptions(properties.map((property) => property?.property_type)),
    [properties],
  );

  const prices = useMemo(
    () => [
      ANY_OPTION,
      ...new Set(
        properties
          .map((property) => Number(property?.price))
          .filter((price) => Number.isFinite(price))
          .sort((firstPrice, secondPrice) => firstPrice - secondPrice)
          .map(String),
      ),
    ],
    [properties],
  );

  const filteredProperties = useMemo(
    () =>
      properties.filter((property) => {
        const price = Number(property?.price ?? 0);
        const matchesProvince = province === ANY_OPTION || property?.province === province;
        const matchesCity = city === ANY_OPTION || property?.city === city;
        const matchesType =
          propertyType === ANY_OPTION || property?.property_type === propertyType;
        const matchesMinPrice = minPrice === ANY_OPTION || price >= Number(minPrice);
        const matchesMaxPrice = maxPrice === ANY_OPTION || price <= Number(maxPrice);

        return (
          matchesProvince &&
          matchesCity &&
          matchesType &&
          matchesMinPrice &&
          matchesMaxPrice
        );
      }),
    [properties, province, city, propertyType, minPrice, maxPrice],
  );

  return {
    properties: filteredProperties,
    filteredProperties,
    province,
    setProvince: (value) => {
      setProvince(value);
      setCity(ANY_OPTION);
    },
    city,
    setCity,
    propertyType,
    setPropertyType,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    provinces,
    cities,
    propertyTypes,
    prices,
  };
}

export default usePropertySearch;