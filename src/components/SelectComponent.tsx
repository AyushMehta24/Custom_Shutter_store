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
      <select {...register(name)}>
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
