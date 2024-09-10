import Amenity from '@/components/Amenity';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import supabase from '@/lib/supabase';
import React, { useEffect, useState } from 'react'
import { IoBedSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { SlSizeFullscreen } from "react-icons/sl";
import { toast, ToastContainer } from 'react-toastify';
import { FaSwimmingPool } from 'react-icons/fa';
import { PiGarageFill, PiPottedPlant } from 'react-icons/pi';
import Map from '@/components/Map';
// import AgentCard from '@/components/AgentCard';
import Amenities from '@/components/Amenities';

function Property() {

const [property, setProperty] = useState(null);
const [selectedImage, setSelectedImage] = useState("https://placehold.co/600x400?text=Property")

// Get the id of the property
const propertyId = useParams().id;
const location = {lat: -29.118130, lng: -29.118130}
// Get the details of a property
useEffect(() => {

    const getProperty = async () => {
        const {data, error} = await supabase
        .from("properties")
        .select()
        .eq("id",propertyId)

        error && console.log(error)
        if (data){
            setProperty(data[0])
            setSelectedImage(data[0].cover_img)
        } 

    }

    getProperty()

}, [])


  return (
    <div className='flex gap-4 mt-4 text-left'>
        <div className="left flex flex-col  flex-1">
            <img src={selectedImage} alt="" className='h-[400px] object-cover object-center rounded-2xl mb-2' />
            <Carousel>
        <CarouselContent className="-mr-4">
          {/* Loop Over Each image */}
          {property?.images?.map((img, idx) => (
            <CarouselItem key={idx} className="pr-4 basis-auto cursor-pointer">
            <img src={img} alt="" className='h-32 rounded-2xl' onClick={() => {setSelectedImage(img)}}/>
          </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Property Details */}

      <section className="details flex justify-between">
      <div className="article">
          {/* Title */}
          <h1 className='font-bold text-3xl capitalize mt-3 mb-2'>{property?.title}</h1>
        {/* Amenities */}
          <Amenities property={property}></Amenities>
      </div>
      <div className="article overflow-hidden mt-3">
        <Map location={location}/>
      </div>
      </section>
        {/* Description */}

        <h1 className='font-bold text-3xl capitalize mt-3 mb-2'>Description</h1>

        <p>
          {property?.description}
        </p>

        </div>

        <div className="right border-1 p-4 border-slate-400 m-2  w-1/4">
          
        </div>
       
    </div>
  )
}

export default Property