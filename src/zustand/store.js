import { create } from "zustand";

export const useFilterStore = create((set) => ({
    // State variables
    province: "Any",
    city: "Any",
    propertyType: "Any",
    minPrice: "Any",
    maxPrice: "Any",
    followers: 5,

    // Functions to update the values
    changeProvince: (new_province) => set(() => ({province: new_province})),
    changeCity: (new_city) => set(() => ({city: new_city})),
    changePropertyType: (new_type) => set(() => ({propertyType: new_type})),
    changeMinPrice: (new_price) => set(() => ({minPrice: new_price})),
    changeMaxPrice: (new_price) => set(() => ({maxPrice: new_price}))
}))

export const usePropertiesStore = create((set) => ({
    // state variable
    properties: [],

    // Functions to update state
    setProperties: (list_of_properties) => set(() => ({properties: list_of_properties})) 
}) )