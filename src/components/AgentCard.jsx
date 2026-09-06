/* eslint-disable react/prop-types */
import { MdVerified } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaStar } from "react-icons/fa";

function AgentCard({ agent }) {
  return (
    <div className="bg-gray-100 rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <div className="avatar flex items-center sm:flex-row flex-col gap-4">
        {/* Agent Title Bar */}
        <div className="relative">
          <Avatar className="aspect-square md:h-18 md:w-18 h-14 w-14">
            <AvatarImage src={agent?.profiles?.profile_picture} />
            <AvatarFallback>{`${agent?.profiles?.first_name[0]}${agent?.profiles?.last_name[0]}`}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 right-1 h-6 w-6 rounded-full bg-gray-transparent bg-gray-200 flex items-center justify-center text-white text-xs font-semibold">
            <MdVerified className="text-lg mx-auto text-black" />
          </div>
        </div>
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h3 className="font-semibold text-base md:text-lg">{`${agent?.profiles?.first_name} ${agent?.profiles?.last_name}`}</h3>
          <p className="text-xs text-gray-400">{agent.agency}</p>
          <p className="text-xs text-gray-600 mt-1 font-bold flex items-baseline">
            {agent.properties.length} Listings
            <span className="h-2 w-2 aspect-square rounded-full bg-gray-400 mx-3"></span>
            <span className="flex items-baseline gap-1.5">
              <FaStar className="text-yellow-600"/>
              {agent.rating.toFixed(1)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AgentCard;
