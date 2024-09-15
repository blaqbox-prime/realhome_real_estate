import PropertiesCarousel from "@/components/PropertiesCarousel";
import PropertiesTable from "@/components/PropertiesTable";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { greeting, listings } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AgentFormDialog from "@/components/AgentFormDialog";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/zustand/store";
import { useEffect } from "react";
import supabase from "@/lib/supabase";
import Banner from "@/components/Banner";
import NewPropertyFormDialog from "@/components/NewPropertyFormDialog";

function Dashboard() {
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile)
  const setProfile = useAuthStore((state) => state.setProfile)
  const user = useAuthStore((state) => state.user)
  const agent = useAuthStore((state) => state.agent)
  const fetchAgent = useAuthStore((state) => state.fetchAgent)

  useEffect( () => {
    
    const fetchProfile = async () => {
      const { data, error } = await supabase
    .from('profiles')
    .select().eq('id',user.id);
    
    if(error){
      console.log(error)
    }else {
      setProfile(data[0])
    }
    }
    fetchProfile()
    fetchAgent()

  }, [profile])
  

  return (
    <main className="text-left">
      {/* GREETING */}
      <div className="greeting">
        <h1 className="greeting text-4xl font-bold text-gray-900 mt-4">
          {`${greeting()}`} <span className="text-gray-400">{profile ? profile.first_name : "User"}</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Find the next best property for your portfolio.
        </p>
      </div>

      {/* Banner */}

      {!agent ? (<div className="banner md:h-[300px] mt-8 bg-gray-100 rounded-lg relative flex flex-col justify-center px-6 py-6 md:py-0">
        <div className="banner-content md:w-1/2 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Become An Agent With RealHome
          </h2>
          <p className="">
            Enlist your own private or agency properties with us and reach a
            greater audience like never before
          </p>
          {/* -------------------------------------------------------------------------------------- */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Become An Agent</Button>
            </DialogTrigger>
            <AgentFormDialog />
          </Dialog>
          {/* -------------------------------------------------------------------------------------- */}
        </div>

        <img
          src="/assets/tower-2.png"
          alt="tower"
          className=" hidden md:block absolute bottom-0 right-10"
        />
      </div>) : 
        <Banner title={"Create a new listing"}
        text={"Enlist your own private or agency properties with us and reach a greater audience like never before"}
        image="/assets/tower-2.png"  
        >
          <NewPropertyFormDialog />
        </Banner>
  
      }

      {/* List Properties */}
      <SectionTitle
        title={"My Properties"}
        buttonText="Manage"
        className="mt-8"
        onButtonClick={()=>{navigate('/dashboard/manage-properties')}}
      />
      <PropertiesCarousel properties={listings} />

      {/* Favourited Properties */}
      <SectionTitle
        title={"Favourites"}
        buttonText="Manage"
        className="mt-12"
      />
      <PropertiesTable properties={listings} className="mb-6"/>
    </main>
  );
}

export default Dashboard;
