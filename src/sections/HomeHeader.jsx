import DropDownFilter from '@/components/DropDownFilter'
import { Button } from '@/components/ui/button'
import { citiesOptions, priceOptions, provincesOptions } from '@/lib/utils'
import { useFilterStore } from '@/zustand/store'
import React, {useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HomeHeader = () => {

  const changeProvince = useFilterStore((state) => state.changeProvince)
  const selectedProvince = useFilterStore((state) => state.province)

  return (
    <header className="homepage__header rounded-xl after:rounded-xl h-96">
        <div className="wrapper">
          <h1 className="text-5xl">
            Discover the top real
            <br />
            estate in South Africa
          </h1>
          <p>
            Discover the Finest Real Estate Properties in South Africa <br />{" "}
            From Coastal Retreats to Urban Luxury
          </p>
        </div>

        {/* Homepage Filters */}
        <div className="homepage-filters absolute bottom-[-1.5rem] bg-white shadow-slate-300 rounded-lg shadow-md w-2/3 h-20 grid place-items-center">
          <div className="wrapper flex items-center gap-4 w-full px-6">
            {/* Province */}
            <DropDownFilter type={'province'} selectedProvince={selectedProvince} data={provincesOptions} onChange={changeProvince}/>

            {/* city */}
            <DropDownFilter type={'city'} data={citiesOptions} selectedProvince={selectedProvince}/>

            {/* max price */}
            <DropDownFilter type={'max price'} data={priceOptions}/>

            <Button className="flex items-center gap-3">
            <Link to={"/properties"}>Search</Link> <FaSearch />
            </Button>
          </div>
        </div>
      </header>
  )
}

export default HomeHeader