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
      <div className="sticky top-0 z-10 bg-white shadow-sm mt-10 py-4">
        <SearchFilters className="mt-1"/>
      </div>

      {/* Popular listings */}
      <PopularListings listings={listings} seeMoreButton={false} className="mt-6 mb-8" />

      <SectionTitle title={"All Properties"} button={false} className="mt-4"/>
      {/* Properties Grid View */}
      <PropertiesGrid listings={usePropertiesStore((state) => state.properties)} className="mb-10"/>
    </main>
  );
}

export default SearchProperties;
