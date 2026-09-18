import {
  filtersToSearchParams,
  searchParamsToFilters,
} from "@/lib/propertySearchParams";

describe("property search params", () => {
  it("serializes only active filters", () => {
    expect(
      filtersToSearchParams({
        province: "Gauteng",
        city: "Any",
        propertyType: "Apartment",
        minPrice: "Any",
        maxPrice: "2000000",
      }).toString(),
    ).toBe("province=Gauteng&propertyType=Apartment&maxPrice=2000000");
  });

  it("defaults missing filters to Any", () => {
    expect(searchParamsToFilters(new URLSearchParams("province=Gauteng&unknown=value"))).toEqual({
      province: "Gauteng",
      city: "Any",
      propertyType: "Any",
      minPrice: "Any",
      maxPrice: "Any",
    });
  });
});