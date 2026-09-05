import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <Link
      className="block h-full rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
      to={`/agents/${agent.id}`}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 shrink-0">
          <AvatarImage src={profile.profile_picture} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-gray-900">
            {fullName}
          </h2>
          <p className="truncate text-sm text-gray-500">
            {agent?.agency ?? "Independent agent"}
          </p>
        </div>
      </div>
      <p className="mt-5 text-sm font-medium text-gray-700">
        {propertyCount} {propertyCount === 1 ? "property" : "properties"}
      </p>
    </Link>
  );
}

export default FeaturedAgentCard;