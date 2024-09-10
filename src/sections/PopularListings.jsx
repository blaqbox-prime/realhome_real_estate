import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import React from "react";
import { IoChevronForward } from "react-icons/io5";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from "@/components/SectionTitle";
import PropertiesCarousel from "@/components/PropertiesCarousel";



const PopularListings = ({listings, seeMoreButton = true, className=''}) => {
  return (
    <section className={`text-left my-16 ${className}`}>
    <SectionTitle title="Popular" button={seeMoreButton}/>
      {/* Carousel of Listings */}
      <PropertiesCarousel properties={listings}/>
    </section>
  );
};

export default PopularListings;
