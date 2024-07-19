"use client";

import React, { useContext, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { useFormContext } from "@/contexts/FormContext";
import { AmountContext } from "@/contexts/AmountContext";
import ShutterRow from "./ShutterRow";


export default function ShutterSection(): JSX.Element {
  const { control, watch, getValues } = useFormContext();

  const { finalAmount, setFinalAmount } = useContext(
    AmountContext
  ) as {
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
    let total = 0;
    shutterList &&
      shutterList.map((shutter: any) => {
        total += shutter.area;
      });
    setFinalAmount(total);
  });

  const handleAddShutter = () => {
    appendShutter({
      shutterName: "",
      width: "",
      height: "",
    });
  };

  const handleRemoveShutter = (index: number) => {
    removeShutter(index);
  };

  const handleCloneShutter = (index: number) => {
    insertShutter(index, {
      shutterName: watch(`shutter.${index}.shutterName`),
      width: watch(`shutter.${index}.width`),
      height: watch(`shutter.${index}.height`),
      area: watch(`shutter.${index}.area`),
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {shutterFields.map((_, index): JSX.Element => {
        return (
          <ShutterRow
            key={index}
            index={index}
            handleRemoveShutter={handleRemoveShutter}
            handleCloneShutter={handleCloneShutter}
          />
        );
      })}
      <div className="flex flex-col gap-3">
        <button type="button" onClick={handleAddShutter} >
          Add Shutter
        </button>

        <p className="mt-3">Total Amount : {finalAmount}</p>
      </div>
    </div>
  );
}
