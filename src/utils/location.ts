import Geolocation from "@react-native-community/geolocation";
import { store } from "@/redux";
import { addUserLocation } from "@/redux/actions/auth";
import * as Sentry from "@sentry/react-native";

// utils.ts

import axios from "axios";
import { GOOGLE_API_KEY } from "@/constants";

/**
 * Fetches the user's current geolocation and updates the Redux store.
 * Utilizes Sentry to capture errors for debugging.
 *
 * @async
 * @function handleGetUserLocationEvent
 * @returns {Promise<void>} Resolves when the location is successfully fetched and stored.
 */
export const handleGetUserLocationEvent = async (): Promise<void> => {
  try {
    // Request the user's current position
    Geolocation.getCurrentPosition(
      /**
       * Callback function for successful geolocation retrieval.
       *
       * @param {Object} position - The position object returned by the geolocation API.
       * @param {Object} position.coords - The coordinates object containing latitude and longitude.
       * @param {number} position.coords.latitude - The latitude of the user's location.
       * @param {number} position.coords.longitude - The longitude of the user's location.
       */
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Dispatch the user's location to the Redux store
        store.dispatch(addUserLocation({ latitude, longitude }));
      },
      /**
       * Callback function for geolocation errors.
       *
       * @param {Object} error - The error object returned by the geolocation API.
       */
      (error) => {
        console.error("Error getting user location:", error);

        // Capture the error in Sentry
        Sentry.captureException(error);
      },
      {
        enableHighAccuracy: true, // Enables high accuracy mode (uses GPS)
        timeout: 15000, // Timeout for the request in milliseconds
        maximumAge: 10000, // Accept cached location data if not older than 10 seconds
      },
    );
  } catch (error) {
    // Log and capture any unexpected errors
    console.error("Error handling getUserLocation event:", error);
    Sentry.captureException(error);
  }
};

/**
 * Calculate radius based on latitude delta.
 * @param {number} latitudeDelta - Latitude delta from the map region.
 * @returns {number} - Calculated radius in meters.
 */
export const calculateRadius = (latitudeDelta: number): number => {
  const earthRadiusKm = 6371; // Earth radius in kilometers
  return (latitudeDelta / 360) * 2 * Math.PI * earthRadiusKm * 1000 * 0.45; // Convert to meters
};

export const fetchCityCoordinates = async (
  cityName: string,
): Promise<{ latitude: number; longitude: number } | null> => {
  const apiKey = GOOGLE_API_KEY; // Replace with your actual API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    cityName,
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return {
        latitude: lat,
        longitude: lng,
      };
    } else {
      console.error("City not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

export const getInitialCoordinates = async (
  cityName: string,
  data: any[],
): Promise<{ latitude: number; longitude: number } | null> => {
  if (data.length > 0) {
    const firstHotel = data[0];
    return {
      latitude: firstHotel.location.coordinates[1],
      longitude: firstHotel.location.coordinates[0],
    };
  } else {
    return await fetchCityCoordinates(cityName);
  }
};
