import { useFormContext } from "@/contexts/FormContext";
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
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required: `${label} is required` })} // Example of required validation
        className={`border py-2 px-2 w-48 rounded-md focus:border-blue-500 focus:outline-none bg-white ${
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
