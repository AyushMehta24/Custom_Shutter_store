import { useFormContext } from "@/contexts/FormContext";
import React, { ChangeEventHandler } from "react";
// import { FormErrors } from "./types"; // Import the type

export type FormErrors = {
  [key: string]: {
    message?: string;
  };
};

export default function TextComponent({
  label,
  name,
  type,
  handleChange,
  isDisabled = false,
}: {
  label: string;
  name: string;
  type: string;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  isDisabled?: boolean;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  console.log(errors);

  // Cast errors to your specific type
  const formErrors = errors as FormErrors;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={label}
        {...register(name)}
        onChange={handleChange}
        disabled={isDisabled}
        className="border p-2 w-48 rounded-md focus:border-blue-500 focus:outline-none"
      />
      {formErrors[name] && (
        <span className="text-red-500">
          {formErrors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
