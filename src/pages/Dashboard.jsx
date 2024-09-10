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

function Dashboard() {
  return (
    <main className="text-left">
      {/* GREETING */}
      <div className="greeting">
        <h1 className="greeting text-4xl font-bold text-gray-900 mt-4">
          {`${greeting()}`} <span className="text-gray-400">Tlou</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Find the next best property for your portfolio.
        </p>
      </div>

      {/* Banner */}

      <div className="banner h-[300px] mt-8 bg-gray-100 rounded-lg relative flex flex-col justify-center px-6">
        <div className="banner-content w-1/2 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">
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
          className="absolute bottom-0 right-10"
        />
      </div>

      {/* List Properties */}
      <SectionTitle
        title={"My Properties"}
        buttonText="Manage"
        className="mt-8"
      />
      <PropertiesCarousel properties={listings} />

      {/* Favourited Properties */}
      <SectionTitle
        title={"Favourites"}
        buttonText="Manage"
        className="mt-12"
      />
      <PropertiesTable properties={listings} />
    </main>
  );
}

export default Dashboard;
