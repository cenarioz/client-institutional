"use client";

import { IPlace } from "@/commons/@types/place";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  IoBalloonOutline,
  IoCafeOutline,
  IoExpandOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import Divisor from "../atoms/Divisor";
import Categories from "../molecules/Categories";
import Property from "../molecules/Property";
import PaymentCard from "../molecules/paymentCard";

interface PostBodyProps {
  place: IPlace;
}

function PostBody({ place }: PostBodyProps) {
  const t = useTranslations();
  const [more, setMore] = useState(false);

  const placeSizes = [
    place.details?.size &&
      `Tamanho da propriedade (metros quadrados): ${place.details.size} M²`,
    place.details?.height && `Altura: ${place.details?.height} M`,
    place.details?.width && `Largura: ${place.details?.width} M`,
    place.details?.length && `Comprimento: ${place.details?.length} M`,
  ];

  const crewAccess = [
    "elevator",
    "freight_elevator",
    "stairs",
    "street_level",
    "wheelchair",
  ];

  const crewAccessDescription: string[] = Object.keys(place.details)
    .filter((key, index) => {
      if (crewAccess.includes(key) && place.details[key] === true) return true;
    })
    .map((key) => {
      return t(`enum.${key}`);
    });

  const dayOrder = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  place.opening_hours.sort((a, b) => {
    const dayA = dayOrder.indexOf(a.day_of_week);
    const dayB = dayOrder.indexOf(b.day_of_week);
    return dayA - dayB;
  });

  const property: any = [
    place.details?.parking_spots && {
      title: t("place.parking"),
      description: t(`enum.parking_spots`, {
        value: place.details?.parking_spots,
      }),
    },

    place.categories?.length > 0 && {
      title: t("place.category/style"),
      description: place.categories
        .map((category) => {
          return category.name;
        })
        .join(", "),
    },

    placeSizes?.length > 0 && {
      title: t("place.details"),
      description: placeSizes.join(", "),
    },

    place.rules?.length > 0 && {
      title: t("place.rules"),
      description: place.rules
        .map((rule) => {
          return rule.name;
        })
        .join(", "),
    },

    place.features?.length > 0 && {
      title: t("place.resources"),
      description: place.features
        .map((feature) => {
          return feature.name;
        })
        .join(", "),
    },

    place.amenities?.length > 0 && {
      title: t("place.facilities"),
      description: place.amenities
        .map((amenity) => {
          return amenity.name;
        })
        .join(", "),
    },

    {
      title: t("place.characteristics"),
      description:
        "Piso de carpete\nPiso de concreto\nParedes de tijolo\nParedes de textura\nparedes brancas\nJanelas do chão ao teto",
    },
    crewAccessDescription?.length > 0 && {
      title: t("place.crew_access"),
      description: crewAccessDescription.join(", "),
    },
    place.opening_hours?.length > 0 && {
      title: t("place.opening_hours"),
      description: (
        <>
          {place.opening_hours?.map((openHour) => {
            return (
              <div
                key={Math.random()}
                className={`${
                  !openHour?.active && "text-gray-500"
                } flex justify-between`}
              >
                <div>{t(`enum.day_week.${openHour?.day_of_week}`)}</div>
                <div>
                  {openHour?.active
                    ? `${openHour?.opening_time} - ${openHour?.closing_time}`
                    : t('place.closed')}
                </div>
              </div>
            );
          })}
        </>
      ),
    },
  ];

  const truncate = (input: string) =>
    input?.length > 300 ? `${input.substring(0, 254)}...` : input;

  const handleMore = () => {
    more && setMore(false);
    !more && setMore(true);
  };

  const info = [
    {
      icon: <IoTimeOutline />,
      name: `${
        place?.minimum > 1
          ? `${place?.minimum} ${t("place.hours")}`
          : `1 ${t("place.hour")}`
      }`,
      disabled: !place?.minimum,
    },
    {
      icon: <IoPeopleOutline />,
      name: `${
        place?.details?.max_attendees > 1
          ? `${place?.details?.max_attendees} ${t("place.persons")}`
          : `1 ${t("place.person")}`
      }`,
      disabled: !place?.details?.max_attendees,
    },
    {
      icon: <IoExpandOutline />,
      name: `${place?.details?.size} M²`,
      disabled: !place?.details?.size,
    },
    {
      icon: <IoVideocamOutline />,
      name: t("place.production"),
      disabled: !place?.details?.production,
    },
    {
      icon: <IoBalloonOutline />,
      name: t("place.event"),
      disabled: !place?.details?.event,
    },
    {
      icon: <IoCafeOutline />,
      name: t("place.meeting"),
      disabled: !place?.details?.meeting,
    },
  ];

  return (
    <div className="flex py-16">
      <div className="w-2/3">
        <h1 className="text-xl font-medium mb-5">{t("place.information")}</h1>
        <Categories props={info} />
        <h1 className="text-xl font-medium mb-5">{t("place.description")}</h1>
        <p className="text-base">
          {!more ? truncate(place.description) : place.description}
        </p>
        <div className="w-full text-center underline py-4">
          {place.description.length > 300 && (
            <p onClick={handleMore}>
              {!more ? t("place.more") : t("place.less")}
            </p>
          )}
        </div>

        <Divisor></Divisor>

        <div className="mt-5">
          <h1 className="text-xl font-medium mb-5">{t("place.about_place")}</h1>
          {property.map((item: { title: string; description: string }) => {
            return (
              <Property
                key={Math.random()}
                title={item?.title}
                description={
                  typeof item?.description === "function"
                    ? item?.description
                    : item?.description
                }
              ></Property>
            );
          })}
        </div>
        <Divisor></Divisor>
        <div className="flex flex-row content-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full my-10 mr-4 overflow-hidden">
            <img
              src={place.host.user.photo}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              alt=""
            ></img>
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-bold">{place.host.user.name}</p>
            <p className="font-normal text-sm text-gray-500">
              <span className="font-medium">Response rating: </span>
              {place.host.response_rating}
            </p>
            <p className="font-normal  text-sm  text-gray-500">
              <span className="font-medium">Response time:</span>{" "}
              {place.host.time_rating}
            </p>
          </div>
        </div>
        <Divisor></Divisor>
      </div>
      <div className="ml-[8.333333333333332%] w-1/3">
        <PaymentCard
          openingHours={place.opening_hours}
          bookings={place.bookings}
          place={place}
          isLoading={!place}
        ></PaymentCard>
      </div>
    </div>
  );
}

export default PostBody;
