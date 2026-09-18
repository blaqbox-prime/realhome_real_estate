export const PROPERTY_FILTER_KEYS = [
  "province",
  "city",
  "propertyType",
  "minPrice",
  "maxPrice",
];

const ANY_OPTION = "Any";

export function filtersToSearchParams(filters) {
  const params = new URLSearchParams();

  PROPERTY_FILTER_KEYS.forEach((key) => {
    const value = filters?.[key];

    if (value && value !== ANY_OPTION) {
      params.set(key, value);
    }
  });

  return params;
}

export function searchParamsToFilters(searchParams) {
  return PROPERTY_FILTER_KEYS.reduce((filters, key) => {
    filters[key] = searchParams.get(key) || ANY_OPTION;
    return filters;
  }, {});
}