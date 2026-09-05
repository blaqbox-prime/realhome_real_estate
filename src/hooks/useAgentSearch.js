import { useEffect, useMemo, useState } from "react";

export const AGENT_SORT_OPTIONS = {
  NAME: "name",
  YEARS_OF_EXPERIENCE: "years_of_experience",
  MOST_PROPERTIES: "most_properties",
  LEAST_PROPERTIES: "least_properties",
};

const DEFAULT_DEBOUNCE_MS = 300;
const ANY_OPTION = "Any";

const getProfile = (agent) => agent?.profiles ?? agent?.profile ?? agent;

const getAgentName = (agent) => {
  const profile = getProfile(agent);
  const firstName = profile?.first_name ?? agent?.first_name ?? "";
  const lastName = profile?.last_name ?? agent?.last_name ?? "";
  return `${firstName} ${lastName}`.trim();
};

const getPropertyCount = (agent) =>
  Number(agent?.property_count ?? agent?.properties?.length ?? 0);

const getAgentCities = (agent) => {
  const profile = getProfile(agent);
  const propertyCities = Array.isArray(agent?.properties)
    ? agent.properties.map((property) => property?.city)
    : [];
  const cities = [
    agent?.city,
    agent?.area,
    profile?.city,
    profile?.area,
    ...propertyCities,
  ];

  return [...new Set(cities.filter(Boolean))];
};

const compareText = (firstValue, secondValue) =>
  firstValue.localeCompare(secondValue, undefined, { sensitivity: "base" });

function useAgentSearch({
  agents = [],
  debounceMs = DEFAULT_DEBOUNCE_MS,
  initialSearch = "",
  initialAgency = ANY_OPTION,
  initialCity = ANY_OPTION,
  initialSort = AGENT_SORT_OPTIONS.NAME,
} = {}) {
  const [search, setSearch] = useState(initialSearch);
  const [agency, setAgency] = useState(initialAgency);
  const [city, setCity] = useState(initialCity);
  const [sortBy, setSortBy] = useState(initialSort);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, debounceMs);

    return () => window.clearTimeout(timeoutId);
  }, [debounceMs, search]);

  const agencies = useMemo(
    () => [
      ANY_OPTION,
      ...new Set(
        agents
          .map((agent) => agent?.agency)
          .filter(Boolean)
          .sort(compareText)
      ),
    ],
    [agents]
  );

  const cities = useMemo(() => {
    const agentCities = agents.flatMap(getAgentCities);

    return [ANY_OPTION, ...new Set(agentCities.sort(compareText))];
  }, [agents]);

  const filteredAgents = useMemo(() => {
    const normalizedSearch = debouncedSearch.toLocaleLowerCase();

    return agents
      .filter((agent) => {
        const name = getAgentName(agent).toLocaleLowerCase();
        const agentAgency = agent?.agency ?? "";
        const agentCities = getAgentCities(agent);
        const searchableText = [name, agentAgency, ...agentCities]
          .join(" ")
          .toLocaleLowerCase();

        const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
        const matchesAgency = agency === ANY_OPTION || agentAgency === agency;
        const matchesCity = city === ANY_OPTION || agentCities.includes(city);

        return matchesSearch && matchesAgency && matchesCity;
      })
      .sort((firstAgent, secondAgent) => {
        switch (sortBy) {
          case AGENT_SORT_OPTIONS.YEARS_OF_EXPERIENCE:
            return (
              Number(secondAgent?.years_of_experience ?? 0) -
              Number(firstAgent?.years_of_experience ?? 0)
            );
          case AGENT_SORT_OPTIONS.MOST_PROPERTIES:
            return getPropertyCount(secondAgent) - getPropertyCount(firstAgent);
          case AGENT_SORT_OPTIONS.LEAST_PROPERTIES:
            return getPropertyCount(firstAgent) - getPropertyCount(secondAgent);
          case AGENT_SORT_OPTIONS.NAME:
          default:
            return compareText(getAgentName(firstAgent), getAgentName(secondAgent));
        }
      });
  }, [agents, agency, city, debouncedSearch, sortBy]);

  return {
    agents: filteredAgents,
    filteredAgents,
    search,
    setSearch,
    agency,
    setAgency,
    city,
    setCity,
    sortBy,
    setSortBy,
    agencies,
    cities,
    isDebouncing: search.trim() !== debouncedSearch,
  };
}

export default useAgentSearch;
