"use server";
import axios from "axios";

export const fetchPlacesSuggestions = async (query) => {
  if (query.length < 3) return [];
  const GOOGLE_PLACES_API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_CLOUD_MAP_API_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_PLACES_API_KEY}&language=en`
    );
    console.log("response", response);
    return response.data.predictions || [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

export const fetchPlaceDetails = async (placeId) => {
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_CLOUD_MAP_API_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}&language=en`
    );
    return response.data.result || null;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};

