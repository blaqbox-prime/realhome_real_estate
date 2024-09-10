/* eslint-disable react/prop-types */
import React from 'react'
import PropertyCard from './PropertyCard'

function PropertiesGrid({listings = []}) {
    console.log("GRID LISTINGS:", listings )
  return (
    <main>
        {listings.length == 0 && <h1>No Properties Available</h1>}
        
        {/* DISPLAY ALL PROPERTIES */}
        <div className="grid grid-cols-4 gap-6 justify-between">
         {
            listings.map((property) => (<PropertyCard key={property.id} property={property}/>))
         }   
        </div>
    </main>
  )
}

export default PropertiesGrid