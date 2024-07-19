"use client";

import { FieldValues } from "react-hook-form";
import ShutterSection from "@/sections/ShutterSection";
import BasicInfoSection from "@/sections/BasicInfoSection";
import DiscountSection from "@/sections/DiscountSection";
import { useFormContext } from "@/contexts/FormContext";
import ButtonComponent from "@/components/ButtonComponent";
import { useState } from "react";
import AddCustomer from "@/sections/AddCustomer";

export default function ShutterForm() {
  const { handleSubmit } = useFormContext();
  const [isModal, setIsModal] = useState(false);

  const onSubmit = (data: FieldValues) => console.log(data);

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
