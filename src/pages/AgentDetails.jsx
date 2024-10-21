import PropertiesGrid from "@/components/PropertiesGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/lib/supabase";
import { useAuthStore } from "@/zustand/store";
import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {io} from 'socket.io-client'


function AgentDetails() {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user)
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const params = useParams();
  const [socket, setSocket] = useState(null)

  const messages = [
    {sender: "Bruce",
      message: 'A query sent',
      id:"bc61aa43-64ef-4ba5-8a98-5e4155ec7ead"
    },
    {sender: "agent",
      message: 'this is for testing'
    }
  ]

  useEffect(() => {
    !user && fetchUser()
    console.log(user)
  }, [])
  
  useEffect(() => {
    setSocket(io('http://localhost:4000'))
  }, [])

  useEffect(() => {
    if(socket){
      socket.on("connect", (data) => {
        console.log(data)
        toast('socket connected. start sending data')
      })

      socket.on('message', (message) => {
        toast.success('New Message Recieved')
        console.log("This is from the socket: \n" + message)
      })
    }

    return () => {
      socket.disconnect()
    }

  }, [])
  
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get the details of an agent
  useEffect(() => {
    const getAgent = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("agents")
        .select("*, profiles(*), properties(*)")
        .eq("id", `${params.id}`);

      error && console.log(error);
      if (data) {
        console.log(data);
        setAgent(data[0]);
      }
      setLoading(false);
    };

    if (!agent) {
      getAgent();
    }
  }, [agent]);


  const handleAgentMessage = (e) => {
    e.preventDefault()
    toast('clicked')

    const msg = document.getElementById('input').value;

    const message = {
      sender: user.email,
      message: msg,
      id: user.id
    }

    socket.emit('message', message);

  }

  return (
    <div className="px-1 my-6 text-left">
      <div className="avatar flex items-center flex-row gap-4">
        <Avatar className="aspect-square md:h-24 md:w-24 h-16 w-16">
          <AvatarImage src={agent?.profiles?.profile_picture} />
          <AvatarFallback>{`${agent?.profiles?.first_name[0]}${agent?.profiles?.last_name[0]}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-left">
          <h3 className="font-bold text-base md:text-3xl">{`${agent?.profiles?.first_name} ${agent?.profiles?.last_name}`}</h3>
          <p className="text-xs md:text-base">{agent?.agency}</p>
        </div>
      </div>

      {/* PORTFOLIO */}
        <section className="my-4">
         <h1 className="font-bold text-lg md:text-2xl">My Portfolio</h1>
         {agent?.properties?.length == 0 ? (<p className="italic text-center text-gray-400 my-4">No properties available yet</p>) : (
          <>
          <PropertiesGrid listings={agent?.properties} className="mt-4"/>
         </>)}
        </section>



      {/* CONTACT */}

      <section className="my-4">
        <h1 className="font-bold text-lg md:text-2xl">Get in Touch</h1>
        
        <div className="flex flex-col gap-4 md:flex-row ">
          {/* FORM */}
          <form action="" className="max-w-md my-4 md:max-w-none flex-1">
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

          {/* CHAT BOX */}

          <div className="chatbox flex flex-1 flex-col justify-end p-3 outline-1 border border-1 rounded-lg outline-gray-100">
              {/* messages area */}

              <section className="messages flex flex-col gap-1 text-sm mb-2">
                {
                  messages.map((message,idx) => (
                  <p key={idx} className={`text-white flex px-2 py-1 rounded-lg w-max ${user?.id == message.id ? 'rounded-tr-none bg-gray-800 self-end' : 'rounded-tl-none bg-slate-600'}`}>
                    {message.message}
                  </p>))
                }
              </section>

              <div className="flex gap-2">
                <Input className="flex-1" type="text" name="" id="input" />
                <Button className='flex items-center justify-center' onClick={(event) => {handleAgentMessage(event)}}><Send size={16}/></Button>
              </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default AgentDetails;
