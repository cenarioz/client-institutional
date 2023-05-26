import React from 'react';

interface Props {
  label: string;
}

const InputWithLabel: React.FC<Props> = ({ label }) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-semibold">{label}</label>
      <input className="px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" />
    </div>
  );
};

export default InputWithLabel;
