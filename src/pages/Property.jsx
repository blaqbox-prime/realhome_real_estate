import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import { getAgentById } from "@/services/agentService";
import { getPropertyById } from "@/services/propertyService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Map from "@/components/Map";
import usePropertyLocation from "@/hooks/usePropertyLocation";
// import AgentCard from '@/components/AgentCard';
import Amenities from "@/components/Amenities";
import { formattedNumber } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

function Property() {
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    "https://placehold.co/600x400?text=Property"
  );

  // Get the id of the property
  const propertyId = useParams().id;
  const location = usePropertyLocation(property);

  const {
    register,
    formState: { errors },
  } = useForm();

  // Get the details of a property
  useEffect(() => {
    const getProperty = async () => {
      const { data, error } = await getPropertyById(propertyId);

      const { data: agentDetails } = await getAgentById(data[0].agent_id);

      error && console.log(error);
      if (data) {
        console.log(data);
        setProperty({ agent: agentDetails[0], ...data[0] });
        console.log({ agent: agentDetails, ...data[0] });
        setSelectedImage(data[0].cover_img);
      }
    };

    getProperty();
  }, [propertyId]);

  return (
    <div className="flex gap-4 flex-col md:flex-row mt-4 text-left w-full page">
      <div className="left flex flex-col  flex-1">
        <img
          src={selectedImage}
          alt=""
          className="h-[400px] object-cover object-center rounded-2xl mb-2 transition-all duration-300"
        />
        <Carousel>
          <CarouselContent className="-mr-4">
            {property?.images?.map((img, idx) => (
              <CarouselItem
                key={idx}
                className="basis-1/4 cursor-pointer"
              >
                <img
                  src={img}
                  alt=""
                  className="h-32 rounded-2xl"
                  onClick={() => {
                    setSelectedImage(img);
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" /> */}
        </Carousel>

        {/* Property Details */}

        <section className="mt-8 details flex flex-col gap-4 md:flex-row justify-between">
          <div className="article space-y-3 flex-1">
            {/* Title */}
            <div className="flex items-start flex-1 justify-between mt-3 mb-2">
              <h1 className="font-bold text-2xl md:text-3xl capitalize">
                {property?.title}
              </h1>
              <h1 className="font-bold text-right text-2xl md:text-3xl w-1/3 capitalize">
                R{formattedNumber(property?.price)}
              </h1>
            </div>
            {/* Amenities */}
            <Amenities property={property}></Amenities>
          </div>
        </section>

        {/* Description */}

        <section className="mt-6">
          <h1 className="font-bold text-2xl md:text-3xl capitalize mt-3 mb-2">
            Description
          </h1>

          <p className="mb-6">{property?.description}</p>
        </section>

        <div className="overflow-hidden flex flex-1 h-80 my-3">
            <Map location={location} />
          </div>

      </div>

      {/* Agents Side Panel */}
      <section className="hidden md:flex md:flex-col right border-1 p-4 bg-gray-50 rounded-md m-2  w-1/4">
        <Link to={`/agents/${property?.agent?.id}`}>
        <div className="avatar flex items-center flex-row gap-4 cursor-pointer">
          <Avatar className="aspect-square  h-16 w-16">
            <AvatarImage src={property?.agent?.profiles?.profile_picture} />
            <AvatarFallback>{`${property?.agent?.profiles?.first_name[0]}${property?.agent?.profiles?.last_name[0]}`}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 text-left">
            <h3 className="font-bold text-base md:text-xl">{`${property?.agent?.profiles?.first_name} ${property?.agent?.profiles?.last_name}`}</h3>
            <p className="text-xs md:text-base">{property?.agent?.agency}</p>
          </div>
        </div>
        </Link>

        <section className="my-4">
        <h1 className="font-bold text-lg">Get in Touch</h1>
        <form action="" className="max-w-md my-4">
          <div className="grid md:grid-cols-1 gap-4 mb-6">
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="email" className="text-left">
                Contact number
              </Label>
              <Input
                id="contact"
                placeholder="Your cell number"
                className=""
                {...register("contact", { required: true })}
              />
              {errors.contact && (
                <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
                  * This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                type="email"
                
                id="email"
                placeholder="bruce@wayne.com"
                className=""
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
                  * This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="message" className="text-left">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type in your message here"
                className=""
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
                  * This field is required
                </span>
              )}
            </div>
          </div>
          <Button type="submit">Send</Button>
        </form>
      </section>

      </section>
    </div>
  );
}

export default Property;
