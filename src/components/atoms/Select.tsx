import SelectLib from "react-select";

const options = [
  { value: "1", label: "1 - 2 Pessoas" },
  { value: "2", label: "2 - 4 Pessoas" },
  { value: "3", label: "5 - 7 Pessoas" },
  { value: "4", label: "8 - 9 Pessoas" },
  { value: "5", label: "10 - 14 Pessoas" },
];

interface SelectProps {
  label?: string;
}

const Select = ({ label }: SelectProps) => {
  const handleChange = (selectedOption: any) => {
    console.log("Opção selecionada:", selectedOption);
  };

  return (
    <>
      <label className="text-gray-700 font-semibold">{label}</label>
      <SelectLib
        options={options}
        onChange={handleChange}
        placeholder="Selecione uma opção"
      />
    </>
  );
};

export default Select;
