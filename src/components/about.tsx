"use client";
import { TbCalculator, TbCertificate2, TbInfinity } from "react-icons/tb";
import Card from "./card";

const About = () => {
  return (
    <div className="flex bg-white pt-24 pb-20 text-black">
      <div className="flex flex-col top-1/3 left-0 w-full items-center ">
        <div className="text-center w-1/4 min-w[350px]">
          <h1 className="text-4xl font-bold">
            Por que escolher a <strong>Cenárioz</strong>
          </h1>
        </div>
        <div className="text-center w-2/3 min-w[350px] pt-6">
          <h4 className="text-2xl font-light text-gray-500 px-24">
            Precisa de um espaço para dar vida às suas ideias? Nós podemos
            ajudá-lo a encontrar o lugar ideal para alugar.
          </h4>
        </div>
        <div className="container mx-auto flex-row flex gap-6 py-24">
        <Card icon={TbCalculator} title={"Orçamento Fácil"} text={"Reserve seu cenário e pague por hora, sem taxas ocultas de horas extras."}/>
        <Card icon={TbCertificate2} title={"Anfitriões experientes"} text={"Conecte-se com proprietários experientes para discutir estúdios, especificações técnicas e acomodações de talentos antes da chamada."}/>
        <Card icon={TbInfinity} title={"Infinitas possibilidades"} text={"Encontre tudo, desde estúdios equipados profissionalmente até quartos e residências não convencionais."}/>

        </div>
      </div>
    </div>
  );
};

export default About;
