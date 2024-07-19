import { useFormContext } from "@/contexts/FormContext";
import React, { ChangeEventHandler } from "react";

type OptionT = {
  name: string;
  label: string;
  value: string;
};

export default function RadioComponent({
  options,
  label,
  handleChange,
}: {
  options: OptionT[];
  label: string;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}) {
  const { register } = useFormContext();
  return (
    <div className="flex gap-5 items-center">
      <label>{label}</label>
      {options.map((option: OptionT) => {
        return (
          <>
            <input
              type="radio"
              id={option.name}
              {...register(option.name)}
              value={option.value}
              onChange={handleChange}
            />
            <label htmlFor={option.name}>{option.label}</label>
          </>
        );
      })}
    </div>
  );
}
