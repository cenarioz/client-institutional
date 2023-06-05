"use client";
import React from "react";
import { BsHeart, BsShare } from "react-icons/bs";
import useSWR from "swr";
import Button from "../atoms/Button";
import Modal from "../molecules/Modal";

interface CardProps {
  onClick: () => void;
  title: string;
  subtitle: string;
  price: number;
  time: string;
  hate: number;
  photos: string[];
}

function multiFetcher(urls: any[]) {
  return Promise.all(urls.map((url) => fetcher(url)));
}

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then(async (r) => URL.createObjectURL(await r.blob()));

function PostHeader() {
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
  const photos = "https://source.unsplash.com/featured/800x601";
  const { data } = useSWR(photos, fetcher);
  const [photosVisible, setPhotosVisible] = React.useState(false);

  if (!data)
    return (
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
    );

  return (
    <>
      <Modal
        isOpen={photosVisible}
        onClose={() => setPhotosVisible(false)}
        title=""
        size={"full"}
      >
        <div className="flex max-w-3xl mx-auto flex-col gap-4 my-10">
          <img
            src={data}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            alt=""
          ></img>
          <div className="relative overflow-hidden h-[250px] flex flex-row gap-1">
            <div className="relative h-full w-full">
              <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
              <img
                src={data}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                alt=""
              ></img>
            </div>
            <div className="relative h-full w-full">
              <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
              <img
                src={data}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                alt=""
              ></img>
            </div>
          </div>
          <img
            src={data}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            alt=""
          ></img>
          <div className="relative overflow-hidden h-[250px] flex flex-row gap-1">
            <div className="relative h-full w-full">
              <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
              <img
                src={data}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                alt=""
              ></img>
            </div>
            <div className="relative h-full w-full">
              <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
              <img
                src={data}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                alt=""
              ></img>
            </div>
          </div>
        </div>
      </Modal>
      <div className="max-w-7xl overflow-hidden mx-auto">
        <div className="py-4">
          <div className="flex flex-row justify-between gap-2">
            <div className="flex flex-col mb-2">
              <p className="text-gray-900 text-lg">
                Florianopolis, Santa Catarina
              </p>
              <p className="text-gray-500 text-sm">
                {" "}
                <span className="text-gray-900 text-sm">★</span>
                <span className="text-gray-900 ml-1 text-sm">4.5</span>{" "}
                <span>Estudio Profissional</span>
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Button onClick={() => {}} light>
                <BsShare size={20} />
              </Button>
              <Button onClick={() => {}} light>
                <BsHeart size={20} />
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row h-[500px] gap-1 rounded-lg overflow-hidden">
          <div className="relative w-full">
            <div
              className="bg-black w-full h-full absolute opacity-0 hover:opacity-20 cursor-pointer"
              onClick={() => {
                setPhotosVisible(true);
              }}
            ></div>
            <img
              src={data}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              alt=""
            ></img>
          </div>
          <div className="relative w-full flex flex-col gap-1">
            <div className="relative overflow-hidden h-[250px]">
              <div
                onClick={() => {
                  setPhotosVisible(true);
                }}
                className="cursor-pointer bg-black w-full h-full absolute opacity-0 hover:opacity-20"
              ></div>
              <img
                src={data}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                alt=""
              ></img>
            </div>
            <div className="relative overflow-hidden h-[250px] flex flex-row gap-1">
              <div className="relative h-full w-full">
                <div
                  className="bg-black w-full h-full absolute opacity-0 hover:opacity-20 cursor-pointer"
                  onClick={() => {
                    setPhotosVisible(true);
                  }}
                ></div>
                <img
                  src={data}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  alt=""
                ></img>
              </div>
              <div className="relative h-full w-full">
                <div
                  onClick={() => {
                    setPhotosVisible(true);
                  }}
                  className="bg-black w-full h-full absolute opacity-0 hover:opacity-20 cursor-pointer"
                ></div>
                <img
                  src={data}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostHeader;
