import { useEffect, useState } from "react";
import { geocodeAddress } from "@/services/geocodingService";

const DEFAULT_LOCATION = { lat: -26.2041, lng: 28.0473 };

function usePropertyLocation(property) {
  const [location, setLocation] = useState(DEFAULT_LOCATION);

  useEffect(() => {
    const address = [
      property?.address,
      property?.city,
      property?.province,
      property?.zipcode,
      "South Africa",
    ]
      .filter(Boolean)
      .join(", ");

    if (!property || !address) {
      setLocation(DEFAULT_LOCATION);
      return undefined;
    }

    const controller = new AbortController();

    geocodeAddress(address, controller.signal)
      .then((coordinates) => {
        if (coordinates) {
          setLocation(coordinates);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Could not geocode property address", error);
        }
      });

    return () => controller.abort();
  }, [property]);

  return location;
}

export default usePropertyLocation;