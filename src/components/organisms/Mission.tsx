"use client";


const Mission = (props: any) => {
  return (
    <div className="flex bg-white pt-24 pb-20 text-black">
      <div className="flex flex-col top-1/3 left-0 w-full items-center ">
        <div className="text-center w-1/4 min-w[350px]">
          <h1 className="text-4xl font-bold">Nossa Missão</h1>
        </div>
        <div className="container mx-auto flex-col flex gap-6 pt-24 text-gray-500">
          <div className="flex flex-row justify-center items-center">
            <p className="w-2/4 py-3 text-lg font-light text-center px-8">
              A Cenarioz é uma plataforma online que conecta proprietários de
              imóveis com locatários que desejam filmar ou realizar eventos em
              seus espaços. A plataforma permite que os locatários pesquisem
              locais para filmagem, se comuniquem com os proprietários e paguem
              facilmente, tudo em um só lugar.
            </p>
            <div className="h-72 w-2/4 bg-center bg-cover rounded-xl px-8 bg-[url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]"></div>
          </div>
          <div></div>
        </div>
        <div className="container mx-auto flex-col flex gap-6 py-24 text-gray-500">
          <div className="flex flex-row justify-center items-center">
            <div className="h-72 w-2/4 bg-center bg-cover rounded-xl px-8 bg-[url('https://images.pexels.com/photos/3866509/pexels-photo-3866509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]"></div>
            <p className="w-2/4 py-3 text-lg font-light text-center px-8">
              O principal objetivo da Cenarioz é fornecer aos locatários uma
              plataforma para encontrar e reservar facilmente locais únicos para
              filmagem e espaços para eventos de forma mais acessível. Além
              disso, a plataforma oferece aos proprietários de imóveis uma nova
              oportunidade de exibir suas propriedades e obter uma renda
              adicional.
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
