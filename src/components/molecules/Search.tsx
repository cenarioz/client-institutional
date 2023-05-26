import { useTranslations } from "next-intl";
import React from "react";
import { IoSearch } from "react-icons/io5";
import Button from "../atoms/Button";
import InputWithLabel from "../atoms/Input";
import Slider from "../atoms/Slider";
import Modal from "./Modal";

export default function Search() {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [filterVisible, setFilterVisible] = React.useState(false);
  const handler = () => setSearchVisible(true);
  const handlerFilter = () => setFilterVisible(true);
  const t = useTranslations();

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
      <Modal
        isOpen={searchVisible}
        onClose={closeSearchHandler}
        title={t("search.modal.search")}
      >
        <div className="flex flex-col gap-8">
          <InputWithLabel
            label={t("search.modal.whatAreYouPlanning")}
          ></InputWithLabel>
          <InputWithLabel label={t("search.modal.where")}></InputWithLabel>
          <InputWithLabel label={t("search.modal.when")}></InputWithLabel>
          <InputWithLabel
            label={t("search.modal.howManyPeople")}
          ></InputWithLabel>
        </div>
        <Modal.footer>
          <div className="flex flex-row justify-between pt-6 mt-6">
            <button className="bg-transparent text-black py-2 rounded-full px-12">
              {t("search.modal.clear")}
            </button>
            <button className="bg-black text-white py-2 rounded-full px-12">
              {t("search.modal.search")}
            </button>
          </div>
        </Modal.footer>
      </Modal>

      <Modal
        isOpen={filterVisible}
        onClose={closeFilterHandler}
        title={t("filter.modal.title")}
      >
        <div className="flex flex-col gap-8">
          <div className="container mx-auto flex flex-col">
            <label className="text-gray-700 font-semibold">
              {t("filter.modal.priceRange")}
            </label>
            <label className="text-gray-700 font-light mb-4 mt-2">
              {t("filter.modal.priceRangeDescription", { value: "123" })}
            </label>
            <Slider min={0} max={1000} monetary />
          </div>
          <InputWithLabel label={t("filter.modal.keyword")}></InputWithLabel>
          <div className="container mx-auto flex flex-col">
            <label className="text-gray-700 font-semibold mb-4">
            {t("filter.modal.minimumHours")}
            </label>
            <Slider min={0} max={12} />
          </div>
        </div>
        <Modal.footer>
          <div className="flex flex-row justify-between pt-6 mt-6">
            <button className="bg-transparent text-black py-2 rounded-full px-12">
            {t("filter.modal.clear")}
            </button>
            <button className="bg-black text-white py-2 rounded-full px-12">
            {t("filter.modal.show", { value: "123" })}
            </button>
          </div>
        </Modal.footer>
      </Modal>

      <div className="bg-white w-1/2 min-w-[350px] rounded-full flex items-center justify-between pl-6 pr-2 py-2 cursor-pointer">
        <IoSearch color="black" className="pr-1" size={25} />
        <div onClick={handler} className="ml-2 flex-1">
          <h2 className="text-md font-medium text-gray-800">
            {t("search.whatAreYouPlanning")}
          </h2>
          <p className="text-sm font-light text-gray-500">
            {t("search.subTitle")}
          </p>
        </div>
        <Button onClick={handlerFilter}></Button>{" "}
      </div>
    </>
  );
}
