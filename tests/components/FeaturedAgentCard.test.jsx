import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import FeaturedAgentCard from "@/components/FeaturedAgentCard"

describe("FeaturedAgentCard", () => {
  it("uses a fallback when an agent bio is null", () => {
    render(
      <BrowserRouter>
        <FeaturedAgentCard
          agent={{
            id: "agent-1",
            agency: "Urban Nest Realty",
            profiles: { first_name: "Lerato", last_name: "Dlamini" },
            properties: [],
            bio: null,
          }}
        />
      </BrowserRouter>,
    )

    expect(screen.getByText("No bio available.")).toBeInTheDocument()
    expect(screen.getByText("Lerato Dlamini")).toBeInTheDocument()
  })
})