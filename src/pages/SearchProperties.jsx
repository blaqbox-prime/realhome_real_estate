import PropertiesGrid from "@/components/PropertiesGrid";
import SearchFilters from "@/components/SearchFilters";
import SectionTitle from "@/components/SectionTitle";
import { getProperties } from "@/services/propertyService";
import { listings } from "@/lib/utils";
import PopularListings from "@/sections/PopularListings";
import usePropertySearch from "@/hooks/usePropertySearch";
import { usePropertiesStore } from "@/zustand/store";
import { useEffect } from "react";

function SearchProperties() {

  const properties = usePropertiesStore((state) => state.properties);
  const propertySearch = usePropertySearch({ properties });
  const setProperties = usePropertiesStore((state) => state.setProperties)
  const setPropertiesLoading = usePropertiesStore((state) => state.setPropertiesLoading)
  const setPropertiesError = usePropertiesStore((state) => state.setPropertiesError)

  useEffect(() => {
    const loadProperties = async () => {
      setPropertiesLoading(true)
      const { data, error } = await getProperties().range(0, 49);

        if (error) {
          setPropertiesError(error)
        } else {
          setProperties(data ?? [])
          setPropertiesLoading(false)
        }
      };
      
      loadProperties()
      
    }, [setProperties, setPropertiesError, setPropertiesLoading]);
    
  
  return (
    <main className="Properties">
      {/* SEARCH FILTERS */}
      <div className="z-10 bg-gray-50 my-10 py-4 px-6 rounded-lg shadow-md shadow-gray-300">
        <SearchFilters
          className="mt-1"
          searchState={propertySearch}
        />
      </div>

      {/* Popular listings */}
      <PopularListings listings={listings} seeMoreButton={false} className="mt-6 mb-8" />

      <div className="mt-16">
        <SectionTitle title={"All Properties"} subtitle={`Explore ${properties.length} hand-verified listings available across South Africa`} button={false} className="mt-4"/>
      <PropertiesGrid listings={propertySearch.filteredProperties} className="mb-10"/>
      </div>
    </main>
  );
}

export default SearchProperties;
