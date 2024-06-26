import React, { ChangeEvent, useState } from "react";

interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputWithLabel: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  type,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div
        className="cursor-text w-full rounded-md"
        style={{
          boxShadow:
            isFocused || value
              ? "inset 0 0 0 2px #222"
              : "inset 0 0 0 1px #B0B0B0",
        }}
      >
        <label className="relative flex-1">
          <div
            className="text-gray-500"
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
                isFocused || value ? "translateY(-8px) scale(0.75)" : "none",
            }}
          >
            <div
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </div>
          </div>
          <div>
            <div
              className={`flex ${
                isFocused || value ? "opacity-1" : "opacity-0"
              }`}
            >
              <input
                type={type}
                id="input-field"
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  padding: "0px",
                  margin: "26px 12px 6px",
                  color: "inherit",
                  backgroundColor: "transparent",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  lineHeight: "inherit",
                  appearance: "none",
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
              />
            </div>
          </div>
        </label>
      </div>
    </>
  );
};

export default InputWithLabel;
