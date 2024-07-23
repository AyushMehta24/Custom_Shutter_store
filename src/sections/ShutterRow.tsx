"use client";

import ButtonComponent from "@/components/common/ButtonComponent";
import SelectComponent from "@/components/common/SelectComponent";
import TextComponent from "@/components/common/TextComponent";
import { AmountContext } from "@/contexts/AmountContext";
import { FormType } from "@/types/basicInfoTypes";
import React, { useContext, useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

const ShutterNames: string[] = ["A", "B", "C"];

export default function ShutterRow({
  index,
  handleRemoveShutter,
  handleCloneShutter,
  register,
  errors,
  watch,
  setValue,
}: {
  index: number;
  handleRemoveShutter: (index: number) => void;
  handleCloneShutter: (index: number) => void;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  watch: UseFormWatch<FormType>;
  setValue: UseFormSetValue<FormType>;
}) {
  const { setFinalAmount } = useContext(AmountContext) as {
    finalAmount: number;
    setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
  };

  const [area, setArea] = useState(0);
  const [width, setWidth] = useState(+watch(`shutter.${index}.width`));
  const [height, setHeight] = useState(+watch(`shutter.${index}.height`));

  useEffect(() => {
    setArea(width * height);
    setFinalAmount(
      (prev: number): number => prev + Number(width) * Number(height)
    );
  }, [height, width, setFinalAmount, index]);

  useEffect(() => {
    setValue(`shutter.${index}.area`, area);
  }, [area, index, setValue]);

  return (
    <div key={index} className="flex gap-3  items-end">
      <SelectComponent
        register={register}
        errors={errors}
        name={`shutter.${index}.shutterName`}
        label={"Shutter Name"}
        options={ShutterNames}
      />
      <TextComponent
        register={register}
        errors={errors}
        type="text"
        name={`shutter.${index}.width`}
        label="Width"
        handleChange={(e) => setWidth(+e.target.value)}
      />
      <TextComponent
        register={register}
        errors={errors}
        type="text"
        name={`shutter.${index}.height`}
        label="Height"
        handleChange={(e) => setHeight(+e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor={`shutter.${index}.area`}>Area</label>
        <input
          {...register(`shutter.${index}.area`)}
          disabled={true}
          value={area}
          className="border py-2 px-2 w-48 rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>
      <ButtonComponent
        handleClick={() => handleRemoveShutter(index)}
        label={"Remove"}
        customClass={"mb-1 text-red-500 border-red-500"}
      />
      <ButtonComponent
        handleClick={() => handleCloneShutter(index)}
        label={"Clone"}
        customClass={"mb-1 text-blue-500 border-blue-500 "}
      />
    </div>
  );
}
