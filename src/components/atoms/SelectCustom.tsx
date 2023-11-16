import { useState } from "react";
import { IoAlertCircle } from "react-icons/io5";
import Select from "react-select";

export const CustomSelectComponent = ({ field, form, ...props }: any) => {
  const { options } = props;
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const customStyles = {
    container: () => ({ margin: 0 }),
    input: (provided: any) => ({ ...provided, padding: 0, margin: 0 }),
    indicatorsContainer: () => ({ display: "none" }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      padding: 0,
      paddingBottom:
        Array.isArray(field.value) && field.value?.length > 0 ? 24 : 0,
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      border: "none",
      outline: "none",
      margin:
        state.isMulti && state.hasValue ? "26px 12px 0px" : "18px 12px 0px",
      backgroundColor: "transparent",
      fontFamily: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
      lineHeight: "inherit",
      appearance: "none",
      borderColor: "transparent",
      boxShadow: "none",
    }),
  };

  return (
    <div
      className="text-gray-900 relative flex-1 rounded-md"
      style={{
        boxShadow:
          form.touched[field.name] && form.errors[field.name]
            ? "inset 0 0 0 1px #f97316"
            : isFocused || (field.value && field.value?.length != 0)
            ? "inset 0 0 0 2px #222"
            : "inset 0 0 0 1px #B0B0B0",
      }}
    >
      <div
        className="text-gray-500 flex justify-between"
        style={{
          position: "absolute",
          top: "16px",
          pointerEvents: "none",
          transformOrigin: "0% 0%",
          left: "12px",
          right: "12px",
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          transition: "transform 0.15s cubic-bezier(0.455,0.03,0.515,0.955)",
          transform:
            isFocused || (field.value && field.value.length != 0)
              ? "translateY(-8px) scale(0.75)"
              : "none",
        }}
      >
        <div
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          className={`${
            form.touched[field.name] && form.errors[field.name]
              ? "text-orange-500"
              : ""
          }`}
        >
          {props.label}
        </div>
      </div>

      <div
        className={`flex ${
          isFocused || field.value || props.isMulti ? "opacity-1" : "opacity-0"
        }`}
      >
        <Select
          className="w-full"
          {...field}
          {...props}
          options={options}
          noOptionsMessage={() => null}
          styles={customStyles}
          value={field.value}
          onChange={(option: any) => form.setFieldValue(field.name, option)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {form.touched[field.name] && form.errors[field.name] ? (
        <div className="text-orange-500 text-xs flex items-center gap-1 mt-2">
          <IoAlertCircle size={20} />
          {form.errors[field.name]}
        </div>
      ) : props.info ? (
        <p className="text-xs font-normal text-gray-500 mt-2">{props.info}</p>
      ) : (
        ""
      )}
    </div>
  );
};
