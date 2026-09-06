import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";

const property = {
  id: "property-1",
  title: "Test Home",
  price: 1500000,
  description: "A test property",
  cover_img: "https://example.com/missing-image.jpg",
};

describe("PropertyCard", () => {
  it("uses the local placeholder when the cover image fails", () => {
    render(
      <BrowserRouter>
        <PropertyCard property={property} />
      </BrowserRouter>,
    );

    const image = screen.getByRole("img", { name: "Test Home" });
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/assets/home-hero.jpg");
  });

  it("uses the placeholder immediately when no cover image exists", () => {
    render(
      <BrowserRouter>
        <PropertyCard property={{ ...property, cover_img: null }} />
      </BrowserRouter>,
    );

    expect(screen.getByRole("img", { name: "Test Home" })).toHaveAttribute(
      "src",
      "/assets/home-hero.jpg",
    );
  });
});