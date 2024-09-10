import supabase from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Circles } from 'react-loader-spinner'
import { toast } from 'react-toastify';


function AgentCard({id}) {

    const [agent, setAgent] = useState(null)
    const [loading, setLoading] = useState(true)

// Get the details of an agent
useEffect(() => {

    const getAgent = async () => {
        setLoading(true)
        const {data, error} = await supabase
        .from("agents")
        .select()
        .eq('id', `${id}`)

        error && console.log(error)
        if (data){
            console.log(data)
            setAgent(data[0])
        } 
        setLoading(false)

    }

    if (id !== undefined) {getAgent()}

}, [id])


function handleSubmit(e){
    e.preventDefault();
    toast.success(`message sent! ${agent.first_name} will contact you shortly.`)
    
}



  return loading ? (<Circles
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    />) : (
    <div>
        <div className="avatar flex items-center gap-4 ">
            {/* Agent Title Bar */}
            <Avatar className="aspect-square h-20 w-20">
                <AvatarImage src={agent?.profile_picture}/>
            <AvatarFallback>{`${agent.first_name[0]}${agent.last_name[0]}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
           <h3 className="font-bold text-xl">{`${agent.first_name} ${agent.last_name}`}</h3>
           <p>{agent.agency}</p> 
        </div>
        </div>

        {/* Contact */}

        <h3 className="font-bold uppercase my-4">Contact Agent Today</h3>
        



    </div>
  )
}

export default AgentCard