"use client";

import { IDataPlaces } from "@/commons/@types/place";
import { fetcher } from "@/utils/api";
import { gql } from "graphql-request";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import PostCard, { CardLoading } from "../molecules/PostCard";
import Search from "../molecules/Search";

const Posts = () => {
  const t = useTranslations();

  const { data, error } = useSWR<IDataPlaces>(
    gql`
      {
        places {
          id
          title
          rating
          value
          description
          value_type
          address {
            state
            city
          }
          images {
            path
          }
        }
      }
    `,
    fetcher
  );

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`post/${id}`);
  };
  if (!data) {
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
          <div className="container mx-auto grid xs:grid-cols-1 grid-cols-5 gap-4 pt-10">
            {data.places.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  onClick={() => handleClick(post.id)}
                  title={`${post.address.city}, ${post.address.state}`}
                  subtitle={post.title}
                  value={post.value}
                  type={post.value_type}
                  hate={post.rating}
                  images={post.images}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Posts;
