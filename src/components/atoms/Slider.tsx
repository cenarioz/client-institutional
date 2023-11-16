import React, { useState } from "react";
import Slider from "react-slider";

interface MySliderProps {
  min: number;
  max: number;
  monetary?: boolean;
}

const MySlider: React.FC<MySliderProps> = (props: any) => {
  const { min, max, monetary, field, form, ...rest } = props;
  const [values, setValues] = useState<number[]>(field.value);

  const formatCurrency = (value: number) => {
    if (monetary)
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    return value;
  };

  return (
    <div className="slider-container">
      <div className="flex justify-between mb-6 text-gray-500 font-light text-sm">
        <div className="fixed-value left">
          {field?.value ? formatCurrency(field?.value[0]) : 0}
        </div>
        <div className="fixed-value right">{field?.value ? formatCurrency(field?.value[1]) : 0}</div>
      </div>

      <Slider
        min={min}
        max={max}
        value={field.value}
        onChange={(e) => (form.setFieldValue(field.name, e), setValues(e))}
      />
    </div>
  );
};

export default MySlider;
