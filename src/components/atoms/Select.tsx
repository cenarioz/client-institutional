import { IDetails } from "@/commons/@types/place";
import { useTranslations } from "next-intl";
import SelectLib from "react-select";

interface SelectProps {
  label?: string;
  details: IDetails;
  onChange: (data: any) => void;
  selectedValue: any
}

const Select = ({ label, details, onChange, selectedValue }: SelectProps) => {
  const t = useTranslations();
  const handleChange = (selectedOption: any) => {
    onChange(selectedOption.value);
  };

  const options = [
    {
      value: details.price_pp_hourly_0,
      label: `1 - 5 ${t("place.persons")}`,
      disabled: !details.price_pp_hourly_0,
    },
    {
      value: details.price_pp_hourly_1,
      label: `6 - 15 ${t("place.persons")}`,
      disabled: !details.price_pp_hourly_1,
    },
    {
      value: details.price_pp_hourly_2,
      label: `16 - 30 ${t("place.persons")}`,
      disabled: !details.price_pp_hourly_2,
    },
    {
      value: details.price_pp_hourly_3,
      label: `31 - 45 ${t("place.persons")}`,
      disabled: !details.price_pp_hourly_3,
    },
    {
      value: details.price_pp_hourly_4,
      label: `46 - 60 ${t("place.persons")}`,
      disabled: !details.price_pp_hourly_4,
    },
    {
      value: details.price_pp_hourly_5,
      label: `60 + ${t("place.persons")}`,
      disabled: !details.price_pp_hourly_5,
    },
  ];

  return (
    <>
      <label className="text-gray-700 font-semibold">{label}</label>
      <SelectLib
        options={options}
        onChange={handleChange}
        placeholder={t("place.select_one_option")}
        isOptionDisabled={(option) => option.disabled}
        value={selectedValue && options.find((option) => option.value === selectedValue)}
      />
    </>
  );
};

export default Select;
