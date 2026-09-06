import { fireEvent, render, screen } from "@testing-library/react"
import Pagination from "@/components/Pagination"

const agents = Array.from({ length: 17 }, (_, index) => ({
  id: `agent-${index + 1}`,
  name: `Agent ${index + 1}`,
}))

const renderPagination = (items = agents) =>
  render(
    <Pagination
      items={items}
      itemsPerPage={16}
      ariaLabel="Agent pages"
      renderItem={(agent) => <span>{agent.name}</span>}
      itemKey={(agent) => agent.id}
    />,
  )

describe("Pagination", () => {
  it("shows the configured number of items and correct range", () => {
    renderPagination()

    expect(screen.getByText("Agent 1")).toBeInTheDocument()
    expect(screen.getByText("Agent 16")).toBeInTheDocument()
    expect(screen.queryByText("Agent 17")).not.toBeInTheDocument()
    expect(screen.getByText("1-16")).toBeInTheDocument()
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument()
  })

  it("navigates between pages and disables boundary controls", () => {
    renderPagination()

    const previousButton = screen.getByRole("button", { name: "Previous" })
    const nextButton = screen.getByRole("button", { name: "Next" })

    expect(previousButton).toBeDisabled()
    fireEvent.click(nextButton)

    expect(screen.getByText("Agent 17")).toBeInTheDocument()
    expect(screen.queryByText("Agent 1")).not.toBeInTheDocument()
    expect(screen.getByText("17-17")).toBeInTheDocument()
    expect(nextButton).toBeDisabled()

    fireEvent.click(previousButton)
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument()
  })

  it("renders nothing for an empty list", () => {
    const { container } = renderPagination([])

    expect(container).toBeEmptyDOMElement()
  })
})