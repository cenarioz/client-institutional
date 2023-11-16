import { IPlace } from "@/commons/@types/place";
import request from "graphql-request";

interface IPlaceCount {
  places: IPlace[];
  count: Number;
}

export async function fetchPlaces(query: string) {
  try {
    const response: { places: IPlaceCount | any } = await request(
      process.env.NEXT_PUBLIC_PLACE_API
        ? process.env.NEXT_PUBLIC_PLACE_API
        : "",
      query
    );
    return response.places;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
