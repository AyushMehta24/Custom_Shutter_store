import { useFormContext } from "@/contexts/FormContext";
import React, { ChangeEventHandler } from "react";

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
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={label}
        {...register(name)}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <span>{errors.name && (errors.name?.message as string)}</span>
    </div>
  );
}
