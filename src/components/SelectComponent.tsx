import { useFormContext } from "@/contexts/FormContext";
import React from "react";

export default function SelectComponent({
  label,
  name,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name)}
        className="border py-2 px-2 w-48 rounded-md focus:border-blue-500 focus:outline-none bg-white"
      >
        <option value={""}>{"Select Shutter"}</option>
        {options.map((option: string): JSX.Element => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <span>{errors.name && (errors.name?.message as string)}</span>
    </div>
  );
}
