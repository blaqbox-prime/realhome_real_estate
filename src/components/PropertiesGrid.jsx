/* eslint-disable react/prop-types */
import PropertyCard from './PropertyCard'
import Pagination from './Pagination'

function PropertiesGrid({listings = [], className=''}) {
  return (
    <main className={`${className}`}>
        {listings.length == 0 && <h1>No Properties Available</h1>}
        
        <Pagination
          items={listings}
          itemsPerPage={12}
          listClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 md:justify-between"
          ariaLabel="Property pages"
          renderItem={(property) => <PropertyCard property={property} />}
          itemKey={(property) => property.id}
        />
    </main>
  )
}

export default PropertiesGrid