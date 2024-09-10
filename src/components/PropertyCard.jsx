import { formattedNumber } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router-dom'
import Amenities from './Amenities'

const PropertyCard = ({property}) => {
  return (
   <Link to={`/properties/${property.id}`}>
    <article className='property-card w-80 text-left cursor-pointer'>
        <div className="relative  h-[340px]  object-cover">
            <img src={property.cover_img} alt="property" className=' rounded-2xl filter object-cover brightness-50 h-full w-full'/>
            <h2 className='absolute bottom-4 left-4 max-w-5 font-extrabold text-white text-lg'>{property.title}</h2>
        </div>
        {/* Price */}
        <p className='mt-2 text-gray-600 font-bold'>
            R{formattedNumber(property.price)}
        </p>
        {/* Description */}
        <p className='text-sm text-gray-400 line-clamp-2'>
            {property.description}
        </p>
    </article>
   </Link>
  )
}

export default PropertyCard