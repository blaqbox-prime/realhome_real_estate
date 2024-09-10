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



const LatestListings = ({listings}) => {
  return (
    <section className="text-left my-16">
      <SectionTitle title={"Latest Properties"} />
      {/* Carousel of Listings */}
      <Carousel>
        <CarouselContent className="-mr-4">
          {/* Loop Over Each Listing */}
          {listings.map((property) => (
            <CarouselItem key={property.id} className="pr-4 basis-auto cursor-pointer">
            <PropertyCard property={property} />
          </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default LatestListings;
