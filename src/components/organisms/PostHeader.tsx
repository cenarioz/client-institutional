"use client";
import { IPlace } from "@/commons/@types/place";
import React from "react";
import { BsHeart, BsShare } from "react-icons/bs";
import Button from "../atoms/Button";
import Modal from "../molecules/Modal";
import { Carousel } from "react-responsive-carousel";

function PostHeader({ place }: { place: IPlace }) {
  const [photosVisible, setPhotosVisible] = React.useState(false);

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


  return (
    <>
      {place.images && (
        <Modal
          isOpen={photosVisible}
          onClose={() => setPhotosVisible(false)}
          title=""
          size={"full"}
        >
          <div className="flex max-w-3xl mx-auto flex-col gap-4 my-10">
            <img
              src={place.images[0]?.path ?? `/no-photo-available.png`}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              alt=""
            ></img>
            <div className="relative overflow-hidden h-[250px] flex flex-row gap-1">
              <div className="relative h-full w-full">
                <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
                <img
                  src={place.images[0 + 1]?.path ?? `/no-photo-available.png`}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  alt=""
                ></img>
              </div>
              {place.images[0 + 2]?.path &&
                <div className="relative h-full w-full">
                  <div className="bg-black w-full h-full absolute opacity-0 hover:opacity-20"></div>
                  <img
                    src={place.images[0 + 2]?.path ?? `/no-photo-available.png`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    alt=""
                  ></img>
                </div>
              }

            </div>

            {place.images.slice(3).map((element, index) => {
              return (
                <img
                  key={Math.random()}
                  src={element.path}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  alt=""
                ></img>
              );
            })}
          </div>
        </Modal>
      )}
      <div className="max-w-7xl overflow-hidden mx-auto">
        <div className="py-4">
          <div className="flex flex-row justify-between gap-2">
            <div className="flex flex-col mb-2">
              <p className="text-gray-900 text-2xl font-medium">{`${place.address.city}, ${place.address.state}`}</p>
              <p className="text-gray-500 text-sm">
                {" "}
                <span className="text-gray-900 text-sm">★</span>
                <span className="text-gray-900 ml-1 text-sm">
                  {place.rating}
                </span>{" "}
                <span>{place.title}</span>
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Button onClick={() => { }} light>
                <BsShare size={20} />
              </Button>
              <Button onClick={() => { }} light>
                <BsHeart size={20} />
              </Button>
            </div>
          </div>
        </div>

        {place.images ? (
          <>
            <div className="w-full flex flex-row h-[500px] gap-1 rounded-lg overflow-hidden xs:hidden">
              <div className="relative w-full">
                <div
                  className="bg-black w-full h-full absolute opacity-0 hover:opacity-20 cursor-pointer"
                  onClick={() => {
                    setPhotosVisible(true);
                  }}
                ></div>
                <img
                  src={place.images[0]?.path ?? `/no-photo-available.png`}
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
                    src={place.images[0 + 1]?.path ?? `/no-photo-available.png`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
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
                      src={place.images[0 + 2]?.path ?? `/no-photo-available.png`}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
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
                      src={place.images[0 + 3]?.path ?? `/no-photo-available.png`}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt=""
                    ></img>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative xs:h-72 h-60 md:hidden">
              <Carousel {...settings}>
                {place.images.map((image) => {
                  return (
                    <div
                      onClick={() => {
                        setPhotosVisible(true);
                      }}
                      key={image.path}
                      className="bg-cover w-full"
                      style={{
                        backgroundImage: `url(${image.path})`,
                        backgroundOrigin: "center",
                        minHeight: "288px",
                        maxHeight: "288px"
                      }}
                    >


                    </div>
                  );
                })}
              </Carousel>
            </div>
          </>

        ) : (
          <h1>n tem pao</h1>
        )}
      </div>
    </>
  );
}

export default PostHeader;
