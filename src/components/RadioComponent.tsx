import { useFormContext } from "@/contexts/FormContext";
import React, { ChangeEventHandler } from "react";
// import { FormErrors } from "./types"; // Import your error types

type OptionT = {
  name: string;
  label: string;
  value: string;
};

export type DiscountInfoErrors = {
  discountType?: {
    message?: string;
  };
};

export type FormErrors = {
  discountInfo?: DiscountInfoErrors;
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
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Cast errors to your specific type
  const formErrors = errors as FormErrors;

  return (
    <div className="flex gap-5 items-center">
      <label>{label}</label>
      {options.map((option: OptionT, index: number) => {
        return (
          <div key={index} className="flex gap-2">
            <input
              type="radio"
              id={option.name + index}
              {...register(option.name)}
              value={option.value}
              onChange={handleChange}
            />
            <label htmlFor={option.name + index}>{option.label}</label>
          </div>
        );
      })}
      {formErrors.discountInfo?.discountType && (
        <span className="text-red-500">
          {formErrors.discountInfo?.discountType.message as string}
        </span>
      )}
    </div>
  );
}
