const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function geocodeAddress(address, signal) {
  const response = await fetch(
    `${NOMINATIM_URL}?format=jsonv2&limit=1&countrycodes=za&q=${encodeURIComponent(address)}`,
    {
      signal,
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error(`Geocoding request failed with status ${response.status}`);
  }

  const results = await response.json();
  const result = results[0];

  if (!result) {
    return null;
  }

  return {
    lat: Number(result.lat),
    lng: Number(result.lon),
  };
}