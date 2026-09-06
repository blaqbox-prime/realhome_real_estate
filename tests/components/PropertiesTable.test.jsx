import { fireEvent, render, screen, within } from "@testing-library/react";
import PropertiesTable from "@/components/PropertiesTable";

const properties = [
  {
    id: "1",
    title: "Zebra House",
    description: "Large home",
    property_type: "House",
    city: "Cape Town",
    price: 2000000,
  },
  {
    id: "2",
    title: "Aster Apartment",
    description: "City apartment",
    property_type: "Apartment",
    city: "Durban",
    price: 900000,
  },
];

describe("PropertiesTable", () => {
  it("sorts rows by a clicked header and toggles direction", () => {
    render(<PropertiesTable properties={properties} />);

    const nameHeader = screen.getByRole("button", { name: /Name/ });
    const getPropertyNames = () =>
      screen
        .getAllByRole("row")
        .slice(1)
        .map((row) => within(row).getAllByRole("cell")[0].textContent);

    expect(getPropertyNames()).toEqual(["Aster Apartment", "Zebra House"]);

    fireEvent.click(nameHeader);
    expect(getPropertyNames()).toEqual(["Zebra House", "Aster Apartment"]);
    expect(nameHeader.closest("th")).toHaveAttribute("aria-sort", "descending");
  });

  it("sorts numeric prices before pagination is applied", () => {
    render(<PropertiesTable properties={properties} />);

    fireEvent.click(screen.getByRole("button", { name: /Price/ }));

    const rows = screen.getAllByRole("row").slice(1);
    const prices = rows.map((row) =>
      within(row).getAllByRole("cell")[4].textContent.replace(/\s/g, ""),
    );

    expect(prices).toEqual(["R900000", "R2000000"]);
  });
});