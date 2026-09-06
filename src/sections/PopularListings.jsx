/* eslint-disable react/prop-types */
import SectionTitle from "@/components/SectionTitle";
import PropertiesCarousel from "@/components/PropertiesCarousel";
import { useEffect, useState } from "react";
import { getLatestProperties } from "@/services/propertyService";



const PopularListings = ({listings, seeMoreButton = true, className=''}) => {

  const [properties, setProperties] = useState([])

  useEffect(() => {
    const fetchProperties = async () => {
      const {data, error} = await getLatestProperties()
      
      if(error){
        console.log(error)
        setProperties(listings)
        return;
      }

      setProperties(data)

    }

    fetchProperties()
  
  }, [])
  

  return (
    <section className={`text-left my-16 ${className}`}>
    <SectionTitle title="Popular" button={seeMoreButton} subtitle="Top-Viewed properties this week"/>
    
      {/* Carousel of Listings */}
      <PropertiesCarousel properties={properties}/>
    </section>
  );
};

export default PopularListings;
