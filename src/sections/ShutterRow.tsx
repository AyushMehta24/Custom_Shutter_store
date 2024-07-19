"use client";

import SelectComponent from "@/components/SelectComponent";
import TextComponent from "@/components/TextComponent";
import { AmountContext } from "@/contexts/AmountContext";
import { useFormContext } from "@/contexts/FormContext";
import React, { useContext, useEffect, useState } from "react";

const ShutterNames: string[] = ["A", "B", "C"];

export default function ShutterRow({
  index,
  handleRemoveShutter,
  handleCloneShutter,
}: {
  index: number;
  handleRemoveShutter: (index: number) => void;
  handleCloneShutter: (index: number) => void;
}) {
  const { register, setValue, watch } = useFormContext();

  const { setFinalAmount } = useContext(AmountContext) as {
    finalAmount: number;
    setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
  };

  const [area, setArea] = useState(0);
  const [width, setWidth] = useState(watch(`shutter.${index}.width`));
  const [height, setHeight] = useState(watch(`shutter.${index}.height`));

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
    <div key={index} className="flex gap-3">
      <SelectComponent
        name={`shutter.${index}.shutterName`}
        label={"Shutter Name"}
        options={ShutterNames}
      />
      <TextComponent
        type="text"
        name={`shutter.${index}.width`}
        label="Width"
        handleChange={(e) => setWidth(+e.target.value)}
      />
      <TextComponent
        type="text"
        name={`shutter.${index}.height`}
        label="Height"
        handleChange={(e) => setHeight(+e.target.value)}
      />
      <label htmlFor={`shutter.${index}.area`}>Area</label>
      <input
        {...register(`shutter.${index}.area`)}
        disabled={true}
        value={area}
      />
      <button type="button" onClick={() => handleRemoveShutter(index)}>
        Remove
      </button>
      <button type="button" onClick={() => handleCloneShutter(index)}>
        Clone
      </button>
    </div>
  );
}
