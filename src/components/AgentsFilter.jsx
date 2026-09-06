import { useMemo } from "react";
import { Search } from "lucide-react";
import useAgentSearch, { AGENT_SORT_OPTIONS } from "@/hooks/useAgentSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsBuildingsFill } from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";
import { MdOutlineSort } from "react-icons/md";

/* eslint-disable react/prop-types */

const SORT_LABELS = {
  [AGENT_SORT_OPTIONS.NAME]: "Name",
  [AGENT_SORT_OPTIONS.YEARS_OF_EXPERIENCE]: "Experience",
  [AGENT_SORT_OPTIONS.MOST_PROPERTIES]: "Most properties",
  [AGENT_SORT_OPTIONS.LEAST_PROPERTIES]: "Least properties",
};

function AgentsFilter({ agents = [], children }) {
  const searchState = useAgentSearch({ agents });
  const {
    agencies,
    agency,
    setAgency,
    provinces,
    province,
    setProvince,
    search,
    setSearch,
    sortBy,
    setSortBy,
    filteredAgents,
  } = searchState;

  const popularAgencies = useMemo(() => {
    const agencyCounts = agents.reduce((counts, agent) => {
      if (agent?.agency) counts[agent.agency] = (counts[agent.agency] ?? 0) + 1;
      return counts;
    }, {});

    return Object.entries(agencyCounts)
      .sort(
        ([firstName, firstCount], [secondName, secondCount]) =>
          secondCount - firstCount || firstName.localeCompare(secondName),
      )
      .slice(0, 6)
      .map(([name]) => name);
  }, [agents]);

  return (
    <div className="space-y-5 mb-8">
      <div className="space-y-6 bg-gray-900 p-6 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[3fr_2fr_1fr_1fr] ">
          <label className="relative block">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-50"
            />
            <input
              aria-label="Search agents"
              className="h-10 w-full rounded-lg border-none bg-gray-600 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring text-gray-50"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search agents"
              type="search"
              value={search}
            />
          </label>

          <label htmlFor="agency-select" className="relative block">
            <BsBuildingsFill
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-50"
            />
            <Select value={agency} onValueChange={setAgency}>
              <SelectTrigger
                aria-label="Filter by agency"
                className="text-gray-50 bg-gray-600 border-none pl-10"
              >
                <SelectValue placeholder="Agency" />
              </SelectTrigger>
              <SelectContent className="text-gray-50 bg-gray-600 border-none">
                {agencies.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option === "Any" ? "All agencies" : option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label htmlFor="province-select" className="relative block">
            <FaLocationPin
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-50"
            />
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger
                aria-label="Filter by province"
                className="text-gray-50 bg-gray-600 border-none pl-10"
              >
                <SelectValue placeholder="Province" />
              </SelectTrigger>
              <SelectContent className="text-gray-50 bg-gray-600 border-none">
                {provinces.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option === "Any" ? "All provinces" : option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label htmlFor="sort-select" className="relative block">
            <MdOutlineSort
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-50"
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                aria-label="Sort agents"
                className="text-gray-50 bg-gray-600 border-none pl-10"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="text-gray-50 bg-gray-600 border-none">
                {Object.entries(SORT_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-semibold text-gray-50 uppercase">
            Popular Agencies:
          </span>
          {popularAgencies.map((popularAgency) => (
            <button
              className={`rounded-full border-none px-3 py-1.5 text-sm transition-colors ${agency === popularAgency ? "border-gray-900 bg-gray-900 text-white shadow-sm shadow-gray-500" : "bg-gray-600 text-gray-50 hover:bg-gray-900 hover:text-white"}`}
              key={popularAgency}
              onClick={() => setAgency(popularAgency)}
              type="button"
            >
              {popularAgency}
            </button>
          ))}
        </div>
      </div>

      {typeof children === "function"
        ? children(filteredAgents, searchState)
        : children}
    </div>
  );
}

export default AgentsFilter;
