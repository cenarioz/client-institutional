import React from "react";
import { IoSearch } from "react-icons/io5";
import InputWithLabel from "./inputWithLabel";
import Modal from "./modal";
import Slider from "./range";
import Button from "./rounded-button";

export default function Search() {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [filterVisible, setFilterVisible] = React.useState(false);
  const handler = () => setSearchVisible(true);
  const handlerFilter = () => setFilterVisible(true);

  const closeSearchHandler = () => {
    setSearchVisible(false);
    console.log("closed");
  };
  const closeFilterHandler = () => {
    setFilterVisible(false);
    console.log("closed");
  };
  return (
    <>
      <Modal isOpen={searchVisible} onClose={closeSearchHandler} title="Busca">
        <div className="flex flex-col gap-8">
          <InputWithLabel
            label={"O que você está planejando ?"}
          ></InputWithLabel>
          <InputWithLabel label={"Onde ?"}></InputWithLabel>
          <InputWithLabel label={"Quando ?"}></InputWithLabel>
          <InputWithLabel label={"Quantas Pessoas ?"}></InputWithLabel>
        </div>
        <Modal.footer>
          <div className="flex flex-row justify-between pt-6 mt-6">
            <button className="bg-transparent text-black py-2 rounded-full px-12">
              Limpar Tudo
            </button>
            <button className="bg-black text-white py-2 rounded-full px-12">
              Buscar
            </button>
          </div>
        </Modal.footer>
      </Modal>

      <Modal
        isOpen={filterVisible}
        onClose={closeFilterHandler}
        title="Filtros"
      >
        <div className="flex flex-col gap-8">
          <div className="container mx-auto flex flex-col">
          <label className="text-gray-700 font-semibold">Faixa de Preço</label>
          <label className="text-gray-700 font-light mb-4 mt-2">O preço médio de locação é ‎R$100, não incluindo as taxas ou os impostos.</label>
            <Slider min={0} max={1000} monetary/>
          </div>
          <InputWithLabel label={"Palavra-chave"}></InputWithLabel>
          <div className="container mx-auto flex flex-col">
          <label className="text-gray-700 font-semibold mb-4">Minímo de horas</label>
            <Slider min={0} max={12} />
          </div>
        </div>
        <Modal.footer>
          <div className="flex flex-row justify-between pt-6 mt-6">
            <button className="bg-transparent text-black py-2 rounded-full px-12">
              Limpar Tudo
            </button>
            <button className="bg-black text-white py-2 rounded-full px-12">
              Mostrar 1000+ Cenários
            </button>
          </div>
        </Modal.footer>
      </Modal>

      <div className="bg-white w-1/2 min-w-[350px] rounded-full flex items-center justify-between pl-6 pr-2 py-2 cursor-pointer">
        <IoSearch color="black" className="pr-1" size={25} />
        <div onClick={handler} className="ml-2 flex-1">
          <h2 className="text-md font-medium text-gray-800">
            O que você está planejando
          </h2>
          <p className="text-sm font-light text-gray-500">
            Produção • Gravação • Evento
          </p>
        </div>
        <Button onClick={handlerFilter}></Button>{" "}
      </div>
    </>
  );
}
