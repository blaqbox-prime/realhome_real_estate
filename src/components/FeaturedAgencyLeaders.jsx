import { useMemo } from "react";
import FeaturedAgentCard from "@/components/FeaturedAgentCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaAward } from "react-icons/fa";

/* eslint-disable react/prop-types */

function FeaturedAgencyLeaders({ agents = [] }) {
  const featuredAgents = useMemo(
    () =>
      [...agents]
        .sort(
          (firstAgent, secondAgent) =>
            Number(secondAgent?.property_count ?? secondAgent?.properties?.length ?? 0) -
            Number(firstAgent?.property_count ?? firstAgent?.properties?.length ?? 0),
        )
        .slice(0, 7),
    [agents],
  );

  if (featuredAgents.length === 0) return null;

  return (
    <section className="my-4" aria-labelledby="featured-agents-heading" >
      <div className="my-14 text-left">
        <div className="md:flex justify-between items-center ">
            <h1 id="featured-agents-heading" className="mb-5 text-3xl font-semibold flex gap-2 items-center">
        <span>
            <FaAward />
        </span>
        Featured Agency <span className="text-gray-400">Leaders</span>
      </h1>
      <p className="text-gray-400 italic">
        Recognized for their outstanding performance and dedication to excellence
      </p>
        </div>
      <Carousel className="">
        <CarouselContent>
          {featuredAgents.map((agent) => (
            <CarouselItem
              className="basis-full sm:basis-1/2 lg:basis-1/3"
              key={agent.id}
            >
              <FeaturedAgentCard agent={agent} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious aria-label="Previous featured agents" /> */}
        <CarouselNext aria-label="Next featured agents" />
      </Carousel>
      </div>
    </section>
  );
}

export default FeaturedAgencyLeaders;