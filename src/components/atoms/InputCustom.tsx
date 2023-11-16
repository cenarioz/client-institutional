import { useState } from "react";
import { IoAlertCircle } from "react-icons/io5";

const CustomInput = ({ field, form, ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { type, ...rest } = props;
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div
        className="cursor-text w-full rounded-md"
        style={{
          boxShadow:
            form.touched[field.name] && form.errors[field.name]
              ? "inset 0 0 0 1px #f97316"
              : isFocused || field.value
              ? "inset 0 0 0 2px #222"
              : "inset 0 0 0 1px #B0B0B0",
        }}
      >
        <label className="relative flex-1">
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
              transition:
                "transform 0.15s cubic-bezier(0.455,0.03,0.515,0.955)",
              transform:
                isFocused || field.value
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
          {props.type === "password" && (
            <button
              type="button"
              className="text-xs underline absolute right-4 top-5 cursor-pointer hover:text-gray-500"
              onClick={handlePassword}
            >
              {showPassword ? "Ocultar" : "Exibir"}
            </button>
          )}

          <div>
            <div
              className={`flex ${
                isFocused || field.value ? "opacity-1" : "opacity-0"
              }`}
            >
              <input
                value={field.value || ""}
                type={
                  props.type === "password" && showPassword
                    ? "text"
                    : props.type === "password" && !showPassword
                    ? "password"
                    : props.type
                }
                {...field}
                {...rest}
                id="input-field"
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  padding: "0px",
                  margin: "26px 12px 6px",
                  backgroundColor: "transparent",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  lineHeight: "inherit",
                  appearance: "none",
                }}
                className="text-gray-900"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </label>
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

export default CustomInput;
