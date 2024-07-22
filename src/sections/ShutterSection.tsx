"use client";

import React, { useContext, useEffect, useCallback } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import { AmountContext } from "@/contexts/AmountContext";
import ShutterRow from "./ShutterRow";
import ButtonComponent from "@/components/ButtonComponent";
import { FormType } from "@/types/basicInfoTypes";

const ShutterSection = ({
  register,
  errors,
  watch,
  setValue,
  control,
}: {
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  watch: UseFormWatch<FormType>;
  setValue: UseFormSetValue<FormType>;
  control: Control<FormType, any>;
}): JSX.Element => {
  const { finalAmount, setFinalAmount } = useContext(AmountContext) as {
    finalAmount: number;
    setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
  };

  const {
    fields: shutterFields,
    append: appendShutter,
    remove: removeShutter,
    insert: insertShutter,
  } = useFieldArray({
    control,
    name: "shutter",
  });

  const shutterList = watch("shutter");

  useEffect(() => {
    let total: number = 0;
    shutterList &&
      shutterList.map((shutter: any) => {
        total += shutter.area;
      });
    setFinalAmount(total);
  });
  const handleAddShutter = useCallback(() => {
    appendShutter({
      shutterName: "",
      width: "",
      height: "",
      area: 0,
    });
  }, [appendShutter]);

  const handleRemoveShutter = useCallback(
    (index: number) => {
      removeShutter(index);
    },
    [removeShutter]
  );

  const handleCloneShutter = useCallback(
    (index: number) => {
      insertShutter(index, {
        shutterName: watch(`shutter.${index}.shutterName`),
        width: watch(`shutter.${index}.width`),
        height: watch(`shutter.${index}.height`),
        area: watch(`shutter.${index}.area`),
      });
    },
    [insertShutter, watch]
  );

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Shutter Information</h2>
      <div className="flex flex-col gap-3">
        {shutterFields.map((field, index) => (
          <ShutterRow
            watch={watch}
            setValue={setValue}
            register={register}
            errors={errors}
            key={field.id}
            index={index}
            handleRemoveShutter={handleRemoveShutter}
            handleCloneShutter={handleCloneShutter}
          />
        ))}
        <div className="flex flex-col gap-3">
          <ButtonComponent
            handleClick={handleAddShutter}
            label={"Add Shutter"}
            customClass={" w-36 text-blue-500 border-blue-500"}
          />
          <p className="mt-3">Total Amount : {finalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ShutterSection);
