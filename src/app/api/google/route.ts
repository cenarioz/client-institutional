// pages/api/places-autocomplete.js

// import axios from 'axios';

// export default async function handler(req, res) {
//   const { input } = req.query;
//   const apiKey = 'AIzaSyCNHj6fKR4ONGsYNy3bOo7dE80JmhBIG84';
//   const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}`;

//   try {
//     const response = await axios.get(url);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error('Error fetching predictions:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const input = request.nextUrl.searchParams.get("input");
  const placeId = request.nextUrl.searchParams.get("placeId");
  const apiKey = "AIzaSyCNHj6fKR4ONGsYNy3bOo7dE80JmhBIG84";
  let url = "";
  if (placeId) {
    url = `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${placeId}`;
  } else {
    url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}`;
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // 'API-Key': process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
