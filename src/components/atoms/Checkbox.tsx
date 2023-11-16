const Checkbox = ({ field, form, ...props }: any) => {
  return (
    <label className="flex items-center cursor-pointer relative checkbox-custom">
      <input
        {...field}
        {...props}
        className="form-checkbox h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"
      />
      <span className="checkmark rounded"></span>
      <span className="text-gray-500 ml-8 text-sm">{props.label}</span>
    </label>
  );
};

export default Checkbox;
