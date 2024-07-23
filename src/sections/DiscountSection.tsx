"use client";

import RadioComponent from "@/components/common/RadioComponent";
import TextComponent from "@/components/common/TextComponent";
import { AmountContext } from "@/contexts/AmountContext";
import { FormType } from "@/types/basicInfoTypes";
import React, { useContext, useState, useCallback, useMemo } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const Radio_Options: {
  name: string;
  label: string;
  value: string;
}[] = [
  { name: "discountInfo.discountType", label: "Amount", value: "amount" },
  {
    name: "discountInfo.discountType",
    label: "Percentage",
    value: "percentage",
  },
];

const DiscountSection: React.FC<{
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
}> = ({ register, errors }) => {
  const { finalAmount } = useContext(AmountContext) as { finalAmount: number };
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("amount");

  const handleDiscountTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDiscountType(e.target.value);
    },
    []
  );

  const handleDiscountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDiscount(+e.target.value);
    },
    []
  );

  const payableAmount:number = useMemo(():number => {
    if (discount > 0 && discount <= finalAmount) {
      return discountType === "amount"
        ? finalAmount - discount
        : finalAmount - (finalAmount * discount) / 100;
    }
    return finalAmount;
  }, [discount, discountType, finalAmount]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Discount Information</h2>
      <div className="flex flex-col gap-3">
        <RadioComponent
          register={register}
          errors={errors}
          options={Radio_Options}
          label={"Discount Type"}
          handleChange={handleDiscountTypeChange}
        />
        <TextComponent
          register={register}
          errors={errors}
          label={"Discount"}
          name={"discountInfo.discount"}
          type={"text"}
          handleChange={handleDiscountChange}
        />
        <p>Payable Amount: {payableAmount}</p>
      </div>
    </div>
  );
};

DiscountSection.displayName = "DiscountSection";

export default React.memo(DiscountSection);
