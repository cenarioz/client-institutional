import { IImage } from "@/commons/@types/place";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

interface CardProps {
  onClick: () => void;
  title: string;
  subtitle: string;
  value: number;
  hate: number;
  images: IImage[];
  type: string;
}

// function multiFetcher(urls: string[]) {
//   return Promise.all(urls.map((url) => fetcher(url)));
// }

// const fetcher = (url: string) =>
//   fetch(url)
//     .then(async (r) => URL.createObjectURL(await r.blob()))
//     .catch(() => url);

export const CardLoading = () => {
  return (
    <div className="rounded overflow-hidden cursor-pointer animate-pulse">
      <div className="relative xs:h-80 h-60 bg-gray-300 rounded-xl"></div>
      <div className="py-4">
        <div className="flex flex-row justify-between gap-2">
          <div className="font-bold text-sm mb-3 bg-gray-200 w-full h-4"></div>
          <div className="flex items-center mb-3">
            <span className="ml-1 text-sm bg-gray-200 h-4 w-10"></span>
          </div>
        </div>

        <p className="text-gray-500 text-sm bg-gray-200 h-4 w-1/2"></p>
        <p className="text-gray-500 text-sm bg-gray-200 h-4 w-1/4"></p>
        <p className="text-gray-900 text-sm bg-gray-200 h-4 w-1/4"></p>
      </div>
    </div>
  );
};

function Card({
  onClick,
  title,
  subtitle,
  value,
  type,
  hate,
  images,
}: CardProps) {
  const [isLoading, setIsLoading] = useState(true);
  // console.log(images)
  const settings = {
    showStatus: false,
    infiniteLoop: false,
    emulateTouch: true,
    showThumbs: false,
    autoPlay: false,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: false,
  };

  // useEffect(() => {
  //   const urls = images.map((image) => image.path);
  //   multiFetcher(urls)
  //     .then(() => setIsLoading(false))
  //     .catch((error) => console.error(error));
  // }, [images]);

  const t = useTranslations();

  return (
    <div className="rounded overflow-hidden cursor-pointer">
      <div className="relative xs:h-80 h-60">
        {/* {isLoading ? (
          <div className="relative xs:h-80 h-60 bg-gray-300 rounded-xl"></div>
        ) : ( */}
        <Carousel {...settings}>
          {images.map((image) => {
            // console.log(image)
            return (
              <div
                onClick={onClick}
                key={image.path}
                className="bg-cover w-full"
                style={{
                  backgroundImage: `url(${image.path})`,
                  backgroundOrigin: "center",
                  minHeight: "320px",
                  maxHeight: "320px"
                }}
              ></div>
            );
          })}
        </Carousel>
        {/* )} */}
      </div>
      <div className="py-4" onClick={onClick}>
        <div className="flex flex-row justify-between gap-2">
          <div className="font-bold text-sm mb-2">{title}</div>
          <div className="flex items-center mb-2">
            <span className="text-gray-900 text-sm">★</span>
            <span className="ml-1 text-sm">{hate}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm">{subtitle}</p>
        <p className="text-gray-900 text-sm">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value)}
          <span className="text-gray-500"> / {t(`enum.${type}`)}</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
