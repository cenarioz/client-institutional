"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { IoMap } from "react-icons/io5";
import Search from "../molecules/Search";
import Image from 'next/image';

const Banner = () => {
  const t = useTranslations();
  return (
    <>
      <div className="relative -mt-24 bg-cover bg-center pt-24 pb-20" style={{ backgroundImage: `url('/banner.jpeg')` }}>
        <div className="flex flex-col top-1/2 left-0 w-full items-center ">
          <div className="flex container mx-auto px-4 pt-12 text-white align-middle justify-center">
            <Search />
          </div>
          <div className="container mx-auto px-4 md:pt-24 xs:pt-16">
            <p className="text-4xl w-80 font-bold text-white mb-4 pt-6 pb-6">
              {t("banner.message")}
            </p>

            <Link href={'explore'} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-5 border rounded-full gap-2 shadow inline-flex items-center">
              <span> {t("banner.button")}</span>
              <IoMap />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
