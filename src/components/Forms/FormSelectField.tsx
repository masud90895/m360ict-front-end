"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
  required?: boolean;
};

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  handleChange,
  required,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      <p className="mb-1">
        {label ? <label className="label_text ">{label} </label> : null}
        {required ? <span className="text-red-500">*</span> : null}
      </p>

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={handleChange ? handleChange : onChange}
            size={size}
            options={options}
            value={value}
            style={{
              width: "100%",
              backgroundColor: "#F0F5FA",
            }}
            placeholder={placeholder}
            defaultValue={defaultValue ? defaultValue : undefined}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
