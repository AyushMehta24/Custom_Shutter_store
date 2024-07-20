import { FormType } from "@/types/basicInfoTypes";
import React, { ChangeEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import _ from "lodash"

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
  register,
  errors
}: {
  label: string;
  name: any;
  type: string;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  isDisabled?: boolean;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<any>;
}) {


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
        <span className="text-red-500">
          {_.get(formErrors,`${name}.message`) as string }
        </span>
    </div>
  );
}
