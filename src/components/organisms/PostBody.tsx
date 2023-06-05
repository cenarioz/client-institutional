"use client";
import Divisor from "../atoms/Divisor";
import Categories from "../molecules/Categories";
import Property from "../molecules/Property";
import PaymentCard from "../molecules/paymentCard";

function PostHeader() {
  const property = [
    {
      title: "Categoria e estilo",
      description: "Estúdio Loft, Estúdio de Fotografia",
    },
    {
      title: "Estacionamento",
      description:
        "Caminhão/autocaravana estacionamento no local: Rua\nEstacionamento disponível ou estrutura de estacionamento nas proximidades\nzona permitida\nO endereço provavelmente se enquadra na seguinte zona de permissão: Los Angeles . Por favor, confirme com o anfitrião.",
    },
    {
      title: "Detalhes do local",
      description: "Tamanho da propriedade (pés quadrados):1450 pés quadrados",
    },
    {
      title: "Regras de localização",
      description:
        "Proibido fumar\nFilmagem adulta permitida\nsem álcool\nsem cozinhar\nUso de eletricidade permitido\nSem ruídos altos\nCatering/alimentação externa permitida\nNenhum animal de estimação\nSEM SAPATOS NO SOFÁ. Por favor, faça todo o possível para não sujá-lo.\nSEM SAPATOS NO TAPETE. SEM ESCADA OU EQUIPAMENTO NO TAPETE.\nSEM FICAR SOBRE OS MÓVEIS. Uma taxa substancial de limpeza ou taxa de substituição será adicionada à reserva para os hóspedes que\nSEM PEQUENAS PARTÍCULAS DIFÍCEIS DE LIMPAR. Você será cobrado uma taxa de danos se os sofás forem deixados com glitter\nRIGOROSA POLÍTICA DE ALIMENTOS E BEBIDAS. O consumo de alimentos e bebidas só é permitido usando nossos móveis dobráveis. Estritamente sem comida o\nO espaço NÃO é à prova de som e não permitiremos música alta. Não há bandas ao vivo ou apresentações para videoclipes. A música pode\nSEM FUMAR, SEM VAPOR, SEM QUEIMA DE VELAS, SEM INCENSO no estúdio e no prédio, SEM NÉVOA OU MÁQUINA DE NÉVOA. SEM PINTURA, SA",
    },
    {
      title: "Facilidades",
      description: "Área de cabelo/maquilhagem\nWi-fi",
    },
    {
      title: "Características",
      description:
        "Piso de carpete\nPiso de concreto\nParedes de tijolo\nParedes de textura\nparedes brancas\nJanelas do chão ao teto",
    },
    {
      title: "Acesso da tripulação",
      description:
        "Elevador\nElevador de carga\nEscadaria\nAcesso para Cadeira de Rodas/Deficientes",
    },
    {
      title: "Horário de funcionamento",
      description:
        "Domingo6h00 - 6h00\nSegunda-feira6h00 - 6h00\nTerça-feira6h00 - 6h00\nQuarta-feira6h00 - 6h00\nQuinta-feira6h00 - 6h00\nSexta-feira6h00 - 6h00\nSábado6h00 - 6h00",
    },
  ];

  return (
    <div className="grid py-16 grid-cols-4">
      <div className="pr-8 col-span-3">
        <h1 className="text-xl font-medium mb-5">Eventos Permitidos</h1>
        <Categories />

        <p className="text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p className="w-full text-center underline py-6">Ver Mais</p>
        <Divisor></Divisor>

        <div className="mt-5">
          <h1 className="text-xl font-medium mb-5">Sobre o Espaço</h1>
          {property.map((item) => {
            return (
              <Property
                key={Math.random()}
                title={item.title}
                description={item.description}
              ></Property>
            );
          })}
        </div>
        <Divisor></Divisor>
        <div className="flex flex-row content-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full mx-10 mr-5 my-10"></div>
          <div className="flex flex-col justify-center">
            <p className="font-bold">Victor A.</p>
            <p className="font-normal text-sm text-gray-500">
              <span className="font-medium">Response rating:</span>Excellent
            </p>
            <p className="font-normal  text-sm  text-gray-500">
              <span className="font-medium">Response time:</span> Within an hour
            </p>
          </div>
        </div>
        <Divisor></Divisor>
      </div>
      <div className="">
        <PaymentCard></PaymentCard>
      </div>
    </div>
  );
}

export default PostHeader;
