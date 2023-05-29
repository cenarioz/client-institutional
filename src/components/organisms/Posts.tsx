"use client";
import { useTranslations } from "next-intl";
import PostCard from "../molecules/PostCard";

const Posts = () => {
  const t = useTranslations();
  return (
    <div className="flex bg-white pb-20 text-black">
      <div className="flex flex-col top-1/3 left-0 w-full items-center ">
        <div className="container mx-auto grid xs:grid-cols-1 grid-cols-5 gap-4 py-24 xs:px-3">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
};

export default Posts;
