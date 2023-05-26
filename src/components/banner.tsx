"use client";
import { IoMap } from "react-icons/io5";
import Search from "./search";

const Banner = () => {
  return (
    <>
      <div className="relative bg-cover bg-center bg-[url('https://images.pexels.com/photos/6883795/pexels-photo-6883795.jpeg')] pt-24 pb-20">
        <div className="flex flex-col top-1/3 left-0 w-full items-center ">
          <div className="flex container mx-auto px-4 text-white align-middle justify-center">
            <Search />
          </div>
          <div className="container mx-auto px-4 pt-24">
            <p className="text-4xl w-80 font-bold text-white mb-4 pt-6 pb-6">
              Encontre o lugar <strong>ideal</strong> para dar vida às suas
              ideias
            </p>

            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center">
              <span>Explorar</span>
              <IoMap />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
