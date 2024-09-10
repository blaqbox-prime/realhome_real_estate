import Banner from '@/components/Banner'
import NewPropertyFormDialog from '@/components/NewPropertyFormDialog'
import PropertiesTable from '@/components/PropertiesTable'
import SectionTitle from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { listings } from '@/lib/utils'
import React from 'react'

function ManageProperties() {
  return (
    <main className='text-left'>
        <div className="heading">
        <h1 className="greeting text-4xl font-bold text-gray-900 mt-4">
        Manage Your <span className="text-gray-400">Properties</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Manage your listed properties
        </p>
      </div>

      <Banner title={"Create a new listing"}
      text={"Enlist your own private or agency properties with us and reach a greater audience like never before"}
      image="/assets/tower-2.png"  
      >
        <NewPropertyFormDialog />
      </Banner>

      <SectionTitle
        title={"Properties"}
        button={false}
        className="mt-12"
      />
      <PropertiesTable properties={listings} editable/>

    </main>
  )
}

export default ManageProperties