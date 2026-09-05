import { useMemo } from "react";
import FeaturedAgentCard from "@/components/FeaturedAgentCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <section className="my-8" aria-labelledby="featured-agents-heading">
      <h1 id="featured-agents-heading" className="mb-5 text-3xl font-bold">
        Featured Agents
      </h1>
      <Carousel className="mx-10">
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
        <CarouselPrevious aria-label="Previous featured agents" />
        <CarouselNext aria-label="Next featured agents" />
      </Carousel>
    </section>
  );
}

export default FeaturedAgencyLeaders;