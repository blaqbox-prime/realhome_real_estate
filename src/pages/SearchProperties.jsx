import PropertiesGrid from "@/components/PropertiesGrid";
import SearchFilters from "@/components/SearchFilters";
import SectionTitle from "@/components/SectionTitle";
import { getProperties } from "@/services/propertyService";
import { listings } from "@/lib/utils";
import PopularListings from "@/sections/PopularListings";
import { usePropertiesStore } from "@/zustand/store";
import { useEffect } from "react";

function SearchProperties() {

  const setProperties = usePropertiesStore((state) => state.setProperties) 
  
  

  useEffect(() => {
    const getProperties = async () => {
      const { data, error } = await getProperties().range(1, 50);

        error ? console.error(error) : console.log(data);

        data && setProperties(data) 
      };
      
      getProperties()
      
    }, []);
    
  
  return (
    <main className="Properties">
      {/* SEARCH FILTERS */}
      <SearchFilters className="mt-6"/>

      {/* Popular listings */}
      <PopularListings listings={listings} seeMoreButton={false} className="mt-6 mb-8" />

      <SectionTitle title={"All Properties"} button={false} className="mt-4"/>
      {/* Properties Grid View */}
      <PropertiesGrid listings={usePropertiesStore((state) => state.properties)} className="mb-10"/>
    </main>
  );
}

export default SearchProperties;
