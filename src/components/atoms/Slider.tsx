import React, { useState } from 'react';
import Slider from 'react-slider';

interface MySliderProps {
  min: number;
  max: number;
  monetary?: boolean
}

const MySlider: React.FC<MySliderProps> = ({ min, max, monetary }) => {
  const [values, setValues] = useState<number[]>([min, max]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);
  };

  const formatCurrency = (value: number) => {
    if(monetary) return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return value
  };

  return (
    <div className="slider-container">
      <div className='flex justify-between mb-6 text-gray-500 font-light text-sm'>
      <div className="fixed-value left">{formatCurrency(values[0])}</div>
      <div className="fixed-value right">{formatCurrency(values[1])}</div>
      </div>

      <Slider
        min={min}
        max={max}
        step={1}
        value={values}
        onChange={handleChange}
        renderTrack={(props, state) => (
          <div {...props} className={`track ${state.index === 0 ? 'track1' : 'track2'}`} />
        )}
      />
 
    </div>
  );
};

export default MySlider;
