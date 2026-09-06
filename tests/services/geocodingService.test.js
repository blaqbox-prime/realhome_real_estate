import { geocodeAddress } from "@/services/geocodingService";

describe("geocodeAddress", () => {
  it("returns coordinates from the first geocoding result", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([{ lat: "-33.9249", lon: "18.4241" }]),
      }),
    );

    await expect(geocodeAddress("1 Main Street, Cape Town")).resolves.toEqual({
      lat: -33.9249,
      lng: 18.4241,
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("countrycodes=za"),
      expect.objectContaining({ headers: { Accept: "application/json" } }),
    );
  });

  it("returns null when no address result is found", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve([]) }),
    );

    await expect(geocodeAddress("Unknown address")).resolves.toBeNull();
  });

  it("throws when the geocoding request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));

    await expect(geocodeAddress("1 Main Street")).rejects.toThrow(
      "Geocoding request failed with status 503",
    );
  });
});