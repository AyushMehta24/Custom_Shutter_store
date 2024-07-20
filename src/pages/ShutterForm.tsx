"use client";

import { FieldValues } from "react-hook-form";
import ShutterSection from "@/sections/ShutterSection";
import BasicInfoSection from "@/sections/BasicInfoSection";
import DiscountSection from "@/sections/DiscountSection";
import { useFormContext } from "@/contexts/FormContext";
import ButtonComponent from "@/components/ButtonComponent";
import { useState } from "react";
import AddCustomer from "@/sections/AddCustomer";
import { useDispatch } from "react-redux";
import { addFormData } from "@/store/formSlice";

export default function ShutterForm() {
  const { handleSubmit } = useFormContext();
  const [isModal, setIsModal] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (data: FieldValues) => {
    const shutterData = data.shutter.map((shutter: any) => ({
      shutterName: shutter.shutterName,
      width: shutter.width,
      height: shutter.height,
      area: Number(shutter.width) * Number(shutter.height),
    }));

    const formData = {
      discountInfo: {
        discountType: data.discountInfo.discountType,
        discount: data.discountInfo.discount,
      },
      basicInfo: {
        staffName: data.basicInfo.staffName,
        customerName: data.basicInfo.customerName,
        date: data.basicInfo.date.toISOString().split('T')[0],
      },
      shutter: shutterData,
    };

    dispatch(addFormData(formData));
    console.log("Form Data Submitted:", formData);
  };
  return (
    <div id="shutterForm" className="w-full ">
      <div id="basicInfo" className="flex justify-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-10 flex-col border p-5 shadow-lg rounded-md"
        >
          <BasicInfoSection setIsModal={setIsModal} />
          <ShutterSection />
          <DiscountSection />
          <ButtonComponent
            type="submit"
            label={"Proceed"}
            customClass={"mb-1 text-green-500 border-green-500"}
          />
        </form>
        {isModal && <AddCustomer setIsModal={setIsModal} />}
      </div>
    </div>
  );
}
