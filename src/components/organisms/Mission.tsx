"use client";

import { useTranslations } from "next-intl";

const Mission = (props: any) => {
  const t = useTranslations();
  return (
    <div className="flex bg-white pt-24 pb-20 text-black">
      <div className="flex flex-col top-1/3 left-0 w-full items-center ">
        <div className="text-center w-1/4 xs:w-full min-w[350px]">
          <h1 className="text-4xl font-bold">{t("mission.title")}</h1>
        </div>
        <div className="container mx-auto flex-col flex gap-6 pt-24 text-gray-500">
          <div className="flex flex-row justify-center items-center">
            <p className="w-2/4 xs:w-full py-3 text-lg font-light text-center px-8">
              {t("mission.session1")}
            </p>
            <div className="h-72 w-2/4 xs:hidden bg-center bg-cover rounded-xl px-8 bg-[url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]"></div>
          </div>
          <div></div>
        </div>
        <div className="container mx-auto flex-col flex gap-6 py-24 text-gray-500">
          <div className="flex flex-row justify-center items-center">
            <div className="h-72 xs:hidden w-2/4 bg-center bg-cover rounded-xl px-8 bg-[url('https://images.pexels.com/photos/3866509/pexels-photo-3866509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]"></div>
            <p className="w-2/4 xs:w-full py-3 text-lg font-light text-center px-8">
              {t("mission.session2")}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
