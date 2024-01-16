import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface InputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  customClass?: string;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues | any>;
  errors?: any;
  value?: string;
  disabled?: boolean;
  defaultValue?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: IconType;
}

const InputField = ({
  label,
  name,
  type,
  customClass,
  placeholder,
  required,
  register,
  errors,
  value,
  disabled,
  defaultValue,
  onChange,
  icon: Icon,
}: InputFieldProps) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex gap-1 items-center mb-1">
          <label
            className={`${
              errors && name && errors[name]
                ? "text-[13px] leading-6 font-inter text-rose-500 font-semibold capitalize"
                : "text-[13px] leading-6 font-inter text-gray-40 font-semibold capitalize"
            }`}
          >
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
      )}
      {register ? (
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            {Icon && <Icon className="w-5 h-5 text-primary" />}
          </span>
          <input
            type={type ? type : "text"}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue ? defaultValue : null}
            /* onChange={onChange ? onChange : () => {}} */
            className={`${
              customClass
                ? customClass
                : `${
                    errors && name && errors[name]
                      ? `border-1 w-full ${
                          Icon && "pl-10"
                        }   bg-red-50 rounded-lg py-2 px-[10px] font-inter text-sm leading-6 placeholder:capitalize text-gray-90 focus:outline-rose-500 text-[12px]`
                      : `border w-full ${
                          Icon && "pl-10"
                        } bg-gray-5 rounded-lg border-border py-2 px-[10px] font-inter text-sm leading-6 placeholder:capitalize text-gray-90 focus:outline-purple text-[12px]`
                  }`
            }`}
            {...register(name ? name : "noName", {
              required: required ? true : false,
            })}
          />
        </div>
      ) : (
        <input
          type={type ? type : "text"}
          placeholder={placeholder}
          className={`${
            customClass
              ? customClass
              : `${
                  errors?.name
                    ? "border-1 w-full bg-red-50 rounded-lg py-2 px-[10px] font-inter text-sm leading-6 placeholder:capitalize text-gray-90 focus:outline-rose-500 text-[12px]"
                    : "border w-full bg-gray-5 rounded-lg border-border py-2 px-[10px] font-inter text-sm leading-6 placeholder:capitalize text-gray-90 focus:outline-purple text-[12px]"
                }`
          }`}
          name={name}
          value={value}
          disabled={disabled}
          defaultValue={defaultValue ? defaultValue : null}
          onChange={onChange ? onChange : () => {}}
          required={required ? true : false}
        />
      )}
      {errors && name && errors[name] && (
        <p className="text-rose-500 text-[12px]">
          {errors[name].message ? errors[name].message : `${name} is required`}
        </p>
      )}
    </div>
  );
};

export default InputField;
