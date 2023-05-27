"use client";
import { useTranslations } from "next-intl";
import { TbCalculator, TbCertificate2, TbInfinity } from "react-icons/tb";
import Card from "../atoms/Card";

const About = () => {
  const t = useTranslations();
  return (
    <div className="flex bg-white pt-24 pb-20 text-black">
      <div className="flex flex-col top-1/3 left-0 w-full items-center ">
        <div className="text-center md:w-1/4 sm:w-full min-w[350px]">
          <h1 className="text-4xl font-bold">
            {t("about.title")}
          </h1>
        </div>
        <div className="text-center md:w-2/3 sm:w-full min-w[350px] pt-6">
          <h4 className="text-2xl font-light text-gray-500 md:px-24">
            {t("about.subTitle")}
          </h4>
        </div>
        <div className="container mx-auto xs:flex-col md:flex-row flex gap-6 py-24 xs:px-3">
        <Card icon={TbCalculator} title={t("about.card1.title")} text={t("about.card1.subTitle")}/>
        <Card icon={TbCertificate2} title={t("about.card2.title")} text={t("about.card2.subTitle")}/>
        <Card icon={TbInfinity} title={t("about.card3.title")} text={t("about.card3.subTitle")}/>

        </div>
      </div>
    </div>
  );
};

export default About;
