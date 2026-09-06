import { act, renderHook, waitFor } from "@testing-library/react"
import useAgentSearch, { AGENT_SORT_OPTIONS } from "@/hooks/useAgentSearch"

const agents = [
  {
    id: "1",
    agency: "Urban Nest Realty",
    years_of_experience: 3,
    profiles: { first_name: "Zoe", last_name: "Adams" },
    properties: [{ city: "Cape Town", province: "Western Cape" }],
  },
  {
    id: "2",
    agency: "Prime Property Group",
    years_of_experience: 8,
    profiles: { first_name: "Anele", last_name: "Mokoena" },
    properties: [{ city: "Johannesburg", province: "Gauteng" }],
  },
]

describe("useAgentSearch", () => {
  it("filters by search, agency, and province", async () => {
    const { result } = renderHook(() => useAgentSearch({ agents, debounceMs: 0 }))

    act(() => result.current.setSearch("zoe"))
    await waitFor(() => expect(result.current.filteredAgents).toHaveLength(1))
    expect(result.current.filteredAgents[0].id).toBe("1")

    act(() => result.current.setSearch(""))
    await waitFor(() => expect(result.current.isDebouncing).toBe(false))
    act(() => result.current.setAgency("Prime Property Group"))
    expect(result.current.filteredAgents.map((agent) => agent.id)).toEqual(["2"])

    act(() => result.current.setAgency("Any"))
    act(() => result.current.setProvince("Western Cape"))
    expect(result.current.filteredAgents.map((agent) => agent.id)).toEqual(["1"])
  })

  it("sorts by experience", () => {
    const { result } = renderHook(() =>
      useAgentSearch({
        agents,
        initialSort: AGENT_SORT_OPTIONS.YEARS_OF_EXPERIENCE,
      }),
    )

    expect(result.current.filteredAgents.map((agent) => agent.id)).toEqual(["2", "1"])
  })
})