"use client";
import { fetchPlaces } from "@/actions/fetch-places";
import { IPlace } from "@/commons/@types/place";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import PostCard, { CardLoading } from "../molecules/PostCard";
import Search from "../molecules/Search";

const Posts = () => {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [offset, setOffSet] = useState(0);

  const { ref, inView } = useInView();

  const t = useTranslations();
  const searchParams = useSearchParams();

  const longitude = searchParams.get("longitude");
  const latitude = searchParams.get("latitude");
  const location = searchParams.get("location");
  const howManyPeople = searchParams.get("howManyPeople");
  const placeId = searchParams.get("placeId");
  const type = searchParams.get("type");
  const maxValue = searchParams.get("maxValue");
  const minValue = searchParams.get("minValue");
  const query = {
    ...(latitude && { latitude }),
    ...(longitude && { longitude }),
    ...(longitude && longitude && { radius: 200 }),
    ...(type && { type }),
    ...(howManyPeople && { howManyPeople }),
    ...(minValue && { minValue }),
    ...(maxValue && { maxValue }),
    limit: 15,
    offset,
  };

  const filters = useSelector((state: any) => state.persistedSearch);

  const queryString = Object.keys(query)
    //@ts-ignore
    .map((key) => `${key}: ${key === "type" ? `"${query[key]}"` : query[key]}`)
    .join(", ");

  const graphQuery = `${queryString ? `(${queryString})` : ""}`;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMorePlaces = async () => {
    await delay(2000);
    const nextPage = (page % 7) + 1;
    const newPlaces =
      (await fetchPlaces(
        `
          {
            places ${graphQuery}{
              count
              places {
                id
                title
                rating
                value
                description
                value_type
                details {
                  price_pp_hourly_0
                }
                address {
                  state
                  city
                }
                images {
                  path
                }
              }
            }
          }

  `
      )) ?? [];
    setPlaces((prevPlaces) => [...prevPlaces, ...newPlaces.places]);
    setCount(newPlaces.count);
    setPage(nextPage);
    setOffSet(nextPage * 15);
  };

  useEffect(() => {
    if (inView) {
      loadMorePlaces();
    }
  }, [inView]);

  useEffect(() => {
    console.log("alterou a query");
    setOffSet(0);
    setPage(0);
    setPlaces([]);
    loadMorePlaces();
  }, [searchParams]);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`post/${id}`);
  };

  if (!places) {
    return (
      <div className="flex bg-white pb-20 text-black">
        <div className="flex flex-col top-1/3 left-0 w-full items-center xs:px-3">
          <Search className="md:hidden mt-10 w-full"></Search>
          <div className="container mx-auto grid xs:grid-cols-1 grid-cols-5 gap-4 pt-10">
            {arr.map(() => {
              return <CardLoading key={Math.random()} />;
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex bg-white pb-20 text-black">
        <div className="flex flex-col top-1/3 left-0 w-full items-center xs:px-3">
          <Search className="md:hidden mt-10 w-full"></Search>
          {places.length > 0 && longitude && longitude && (
            <div className="container pt-5">
              <h1>
                Temos {places.length} locações em {location}{" "}
              </h1>
            </div>
          )}
          {places && (
            <>
              <div className="container mx-auto grid xs:grid-cols-1 grid-cols-5 gap-4 pt-10">
                {places.map((post) => (
                  <PostCard
                    key={post.id}
                    onClick={() => handleClick(post.id)}
                    title={`${post.title}`}
                    subtitle={post.title}
                    value={post.value}
                    type={post.value_type}
                    hate={post.rating}
                    images={post.images}
                  />
                ))}
              </div>
            </>
          )}{" "}
          {places.length === 0 && (
            <div className="flex justify-center items-center h-screen -mt-40">
              <h1>Não temos locações nesse local</h1>
            </div>
          )}
          {places.length < count && (
            <div
              ref={ref}
              className="container mx-auto grid xs:grid-cols-1 grid-cols-5 gap-4 pt-10"
            >
              {arr.map(() => {
                return <CardLoading key={Math.random()} />;
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Posts;
