import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdLocalPhone, MdVerified } from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";
import { Button } from "./ui/button";

/* eslint-disable react/prop-types */

function FeaturedAgentCard({ agent }) {
  const profile = agent?.profiles ?? agent?.profile ?? {};
  const firstName = profile.first_name ?? agent?.first_name ?? "";
  const lastName = profile.last_name ?? agent?.last_name ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || "Unnamed agent";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}` || "A";
  const propertyCount = Number(
    agent?.property_count ?? agent?.properties?.length ?? 0,
  );

  return (
    <div>
      <Link
        className="block h-full rounded-t-xl bg-gray-50 p-5 transition-shadow"
        to={`/agents/${agent.id}`}
      >
        <div className="flex flex-col gap-4 relative">
          <div className=" h-16 w-16 shrink-0 relative">
            <Avatar className="h-16 w-16 shrink-0 border-2 border-gray-300">
              <AvatarImage src={profile.profile_picture} alt={fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-gray-900 border-2 border-gray-100 flex items-center justify-center text-white text-xs font-semibold">
              <MdVerified />
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-gray-900">
              {fullName}
            </h2>
            <p className="truncate text-sm font-semibold text-gray-600 flex items-center gap-1">
              <span>
                <BsBuildingsFill />
              </span>
              {agent?.agency ?? "Independent agent"} •{" "}
              {agent?.years_of_experience ?? 0} yrs experience
            </p>
            <p className=" text-sm text-gray-500 mt-2 line-clamp-2">
              {agent?.bio ?? "No bio available."}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between text-sm text-gray-800 bg-gray-100 w-full z-50 px-5 py-5 rounded-b-xl">
        <p className="text-sm font-light text-gray-400">
          <span className="font-semibold text-lg text-gray-900 mr-1">{propertyCount}</span> {propertyCount === 1 ? "property" : "properties"}
        </p>

        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2 border-2 bg-gray-200 text-black hover:text-white hover:bg-gray-500">
            <MdLocalPhone />
          </Button>
          <Link to={`/agents/${agent.id}`}>
            <Button>View Profile</Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default FeaturedAgentCard;
