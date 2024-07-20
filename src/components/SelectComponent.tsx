import { useCustomFormContext } from "@/contexts/FormContext";
import React from "react";

interface SelectComponentProps {
  name: string;
  label: string;
  options: string[];
}

export default function SelectComponent({
  name,
  label,
  options,
}: SelectComponentProps) {
  const {
    register,
    formState: { errors },
  } = useCustomFormContext();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        {...register(name, { required: `${label} is required` })} 
        className={`border py-2 px-2 w-50 rounded-md focus:border-blue-500 focus:outline-none bg-white ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
