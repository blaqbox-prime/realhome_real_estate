import { renderHook, waitFor } from "@testing-library/react";
import usePropertyLocation from "@/hooks/usePropertyLocation";
import { geocodeAddress } from "@/services/geocodingService";

vi.mock("@/services/geocodingService", () => ({
  geocodeAddress: vi.fn(),
}));

describe("usePropertyLocation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses geocoded coordinates for a property address", async () => {
    geocodeAddress.mockResolvedValue({ lat: -33.9249, lng: 18.4241 });

    const property = {
      address: "1 Main Street",
      city: "Cape Town",
      province: "Western Cape",
      zipcode: "8001",
    };
    const { result } = renderHook(() => usePropertyLocation(property));

    await waitFor(() => expect(result.current).toEqual({ lat: -33.9249, lng: 18.4241 }));
    expect(geocodeAddress).toHaveBeenCalledWith(
      "1 Main Street, Cape Town, Western Cape, 8001, South Africa",
      expect.any(AbortSignal),
    );
  });

  it("keeps the South Africa fallback when no result is found", async () => {
    geocodeAddress.mockResolvedValue(null);

    const { result } = renderHook(() =>
      usePropertyLocation({ address: "Unknown address" }),
    );

    await waitFor(() => expect(geocodeAddress).toHaveBeenCalled());
    expect(result.current).toEqual({ lat: -26.2041, lng: 28.0473 });
  });
});