"use client";

import { IDataPlace } from "@/commons/@types/place";
import Divisor from "@/components/atoms/Divisor";
import Nav from "@/components/molecules/Navbar";
import PostBody from "@/components/organisms/PostBody";
import PostHeader from "@/components/organisms/PostHeader";
import { fetcher } from "@/utils/api";
import { gql } from "graphql-request";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function Post() {
  const params = useParams();

  const { data: placeData, error: placeError } = useSWR<IDataPlace>(
    gql`{
      place(id: ${params.id}) {
        title
        rating
        value
        description
        value_type
        categories { name }
        rules { name }
        features { name }
        amenities{ name }
        minimum
        host {
          response_rating
          time_rating
          user {
            name
            photo
          }
        }
        details {
          id
          size
          height
          width
          length
          parking_spots
          elevator
          freight_elevator
          stairs
          street_level
          wheelchair
          air_conditioning
          wifi
          max_attendees
          price_pp_hourly_0
          price_pp_hourly_1
          price_pp_hourly_2
          price_pp_hourly_3
          price_pp_hourly_4
          price_pp_hourly_5
          event
          meeting
          production
        }
        address {
          state
          city
        }
        images {
          path
        }
      }
    }`,
    fetcher
  );
  
  const { data: bookingData, error: bookingError } = useSWR<any>(
    gql`{
      place(id: ${params.id}) {
        opening_hours {
			    opening_time
			    closing_time
			    active
			    day_of_week
					hours
		    }
        bookings {
		    	start_date
		    	end_date
					hours
		    }
      }
    }`,
    fetcher
  );

  if (!placeData || !bookingData) {
    return (
      <main className="max-w-6xl  lg:mx-auto md:mx-8 sm:mx-4 xs:mx-4">
        <Nav search divisor fill="#4E20E0" searchSize="xs" />
        <div>
          <div className="py-4">
            <div className="flex flex-row justify-between gap-2">
              <div className="flex flex-col mb-2">
                <p className="text-gray-900 text-lg bg-gray-200 h-6 mb-2 w-56"></p>
                <p className="text-gray-500 bg-gray-200 text-sm h-5 w-48">
                  <span className="text-gray-900 text-sm bg-gray-200 h-4 w-4 rounded-full"></span>
                  <span className="text-gray-900 ml-1 text-sm bg-gray-200 h-4 w-6"></span>
                  <span className="bg-gray-200 h-4 w-16"></span>
                </p>
              </div>
              <div className="flex items-center mb-2">
                <button className="bg-gray-200 h-8 w-8 rounded-full"></button>
                <button className="bg-gray-200 h-8 w-8 rounded-full ml-2"></button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row h-[500px] gap-1 rounded-lg overflow-hidden">
            <div className="relative w-full">
              <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
              <div className="bg-gray-200 w-full h-full"></div>
            </div>
            <div className="relative w-full flex flex-col gap-1">
              <div className="relative h-full">
                <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
                <div className="bg-gray-200 w-full h-full"></div>
              </div>
              <div className="relative h-full flex flex-row gap-1">
                <div className="relative h-full w-full">
                  <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
                  <div className="bg-gray-200 w-full h-full"></div>
                </div>
                <div className="relative h-full w-full">
                  <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
                  <div className="bg-gray-200 w-full h-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-16 skeleton-box">
          <div className="w-2/3 skeleton-box">
            <h1 className="text-xl font-medium mb-5 skeleton-box">
              Informações
            </h1>

            <div className="flex mb-6 flex-row justify-between w-full gap-4 justify-items-center items-center border-t border-b py-1 pt-4 border-gray-200">
              <div key={Math.random()}>
                <div className="category flex flex-col items-center h-16 pl-4 pr-4">
                  {/* Skeleton Loading for Icon */}
                  <div className="h-6 w-6 bg-gray-300 rounded-full mb-1"></div>
                  {/* Skeleton Loading for Name */}
                  <div className="h-4 bg-gray-300 w-16 mb-1 rounded"></div>
                </div>
              </div>
              <div key={Math.random()}>
                <div className="category flex flex-col items-center h-16 pl-4 pr-4">
                  {/* Skeleton Loading for Icon */}
                  <div className="h-6 w-6 bg-gray-300 rounded-full mb-1"></div>
                  {/* Skeleton Loading for Name */}
                  <div className="h-4 bg-gray-300 w-16 mb-1 rounded"></div>
                </div>
              </div>
              <div key={Math.random()}>
                <div className="category flex flex-col items-center h-16 pl-4 pr-4">
                  {/* Skeleton Loading for Icon */}
                  <div className="h-6 w-6 bg-gray-300 rounded-full mb-1"></div>
                  {/* Skeleton Loading for Name */}
                  <div className="h-4 bg-gray-300 w-16 mb-1 rounded"></div>
                </div>
              </div>
              <div key={Math.random()}>
                <div className="category flex flex-col items-center h-16 pl-4 pr-4">
                  {/* Skeleton Loading for Icon */}
                  <div className="h-6 w-6 bg-gray-300 rounded-full mb-1"></div>
                  {/* Skeleton Loading for Name */}
                  <div className="h-4 bg-gray-300 w-16 mb-1 rounded"></div>
                </div>
              </div>
              <div key={Math.random()}>
                <div className="category flex flex-col items-center h-16 pl-4 pr-4">
                  {/* Skeleton Loading for Icon */}
                  <div className="h-6 w-6 bg-gray-300 rounded-full mb-1"></div>
                  {/* Skeleton Loading for Name */}
                  <div className="h-4 bg-gray-300 w-16 mb-1 rounded"></div>
                </div>
              </div>
              <div key={Math.random()}>
                <div className="category flex flex-col items-center h-16 pl-4 pr-4">
                  {/* Skeleton Loading for Icon */}
                  <div className="h-6 w-6 bg-gray-300 rounded-full mb-1"></div>
                  {/* Skeleton Loading for Name */}
                  <div className="h-4 bg-gray-300 w-16 mb-1 rounded"></div>
                </div>
              </div>
            </div>

            <h1 className="text-xl font-medium mb-5 skeleton-box">
              Descrição do Ambiente
            </h1>
            <div className="h-4 bg-gray-300 w-4/5 mb-1 rounded"></div>
            <div className="h-4 bg-gray-300 w-11/12 mb-1 rounded"></div>
            <div className="h-4 bg-gray-300 w-full mb-1 rounded"></div>
            <div className="h-4 bg-gray-300 w-4/5 mb-1 rounded"></div>
            <div className="w-full text-center skeleton-box"></div>

            <Divisor></Divisor>
          </div>
          <div className="ml-[8.333333333333332%] w-1/3 skeleton-box">
            <div className="w-full h-fit bg-white rounded-lg border-gray-200 top-20 border sticky p-6">
              <div className="h-6 bg-gray-300 mb-2 rounded w-1/2 mx-auto"></div>

              <div className="h-4 bg-gray-300 mb-4 w-3/4 mx-auto rounded"></div>

              <div className="mb-4 flex justify-start items-start flex-col text-left">
                <div className="h-6 bg-gray-300 mb-2 rounded w-1/3"></div>
                <div className="h-11 bg-gray-300 px-4 py-2 mt-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></div>
              </div>

              <div className="flex mb-2 gap-1">
                <div className="h-10 bg-gray-300 w-full rounded"></div>
                <div className="h-10 bg-gray-300 w-full rounded"></div>
              </div>

              <div className="w-full flex text-xs justify-end items-end text-gray-500 mb-2">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
              <div className="mt-4">
                <div className="h-12 bg-gray-300 rounded w-full mx-auto"></div>
              </div>
              <div className="mt-4 border-t border-gray-300 pt-2 flex justify-between">
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } else if (placeError || bookingError) {
    return <>Error</>;
  } else {
    const place = { ...placeData.place, ...bookingData.place };

    return (
      <main className="max-w-6xl  lg:mx-auto md:mx-8 sm:mx-4 xs:mx-4">
        <Nav search divisor fill="#4E20E0" searchSize="xs" />
        <PostHeader place={place}></PostHeader>
        <PostBody place={place}></PostBody>
      </main>
    );
  }
}
