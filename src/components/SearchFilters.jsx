import React, { useState } from 'react'
import DropDownFilter from './DropDownFilter'
import { citiesOptions, priceOptions, provincesOptions } from '@/lib/utils'
import { Button } from './ui/button'
import { FaSearch } from 'react-icons/fa'
import { useFilterStore} from '@/zustand/store'




function SearchFilters({className = ''}) {

    const changeProvince = useFilterStore((state) => state.changeProvince)
    const selectedProvince = useFilterStore((state) => state.province)

    return (
    <div className={`wrapper grid grid-cols-5 grid-flow-col gap-2 items-center w-full justify-between ${className}`}>
            {/* Province */}
            <DropDownFilter type={'province'} selectedProvince={selectedProvince} data={provincesOptions} onChange={changeProvince} />

            {/* city */}
            <DropDownFilter type={'city'} data={citiesOptions} selectedProvince={selectedProvince} />

            {/* property type */}
            <DropDownFilter type={'property type'} data={["House","Apartment","Townhouse"]}/>

            {/* min price */}
            <DropDownFilter type={'min price'} data={priceOptions}/>

            {/* max price */}
            <DropDownFilter type={'max price'} data={priceOptions}/>

            <Button className="flex items-center gap-4">
              Search <FaSearch />
            </Button>
        </div>
  )
}

export default SearchFilters