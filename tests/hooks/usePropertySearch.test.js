import { act, renderHook } from "@testing-library/react";
import usePropertySearch from "@/hooks/usePropertySearch";

const properties = [
  {
    id: "1",
    title: "Cape Town House",
    province: "Western Cape",
    city: "Cape Town",
    property_type: "House",
    price: 1500000,
  },
  {
    id: "2",
    title: "Joburg Apartment",
    province: "Gauteng",
    city: "Johannesburg",
    property_type: "Apartment",
    price: 900000,
  },
  {
    id: "3",
    title: "Cape Town Apartment",
    province: "Western Cape",
    city: "Cape Town",
    property_type: "Apartment",
    price: 2200000,
  },
];

describe("usePropertySearch", () => {
  it("provides derived filter options and all properties by default", () => {
    const { result } = renderHook(() => usePropertySearch({ properties }));

    expect(result.current.filteredProperties).toHaveLength(3);
    expect(result.current.provinces).toEqual(["Any", "Gauteng", "Western Cape"]);
    expect(result.current.propertyTypes).toEqual(["Any", "Apartment", "House"]);
    expect(result.current.prices).toEqual(["Any", "900000", "1500000", "2200000"]);
  });

  it("filters by province, city, type, and price range", () => {
    const { result } = renderHook(() => usePropertySearch({ properties }));

    act(() => result.current.setProvince("Western Cape"));
    expect(result.current.filteredProperties.map((property) => property.id)).toEqual(["1", "3"]);
    expect(result.current.cities).toEqual(["Any", "Cape Town"]);

    act(() => result.current.setPropertyType("Apartment"));
    act(() => result.current.setMinPrice("2000000"));
    expect(result.current.filteredProperties.map((property) => property.id)).toEqual(["3"]);

    act(() => result.current.setPropertyType("Any"));
    act(() => result.current.setMinPrice("Any"));
    act(() => result.current.setProvince("Gauteng"));
    expect(result.current.city).toBe("Any");
    expect(result.current.filteredProperties.map((property) => property.id)).toEqual(["2"]);
  });
});