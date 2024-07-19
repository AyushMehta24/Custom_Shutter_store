"use client";

import { FieldValues } from "react-hook-form";
import ShutterSection from "@/sections/ShutterSection";
import BasicInfoSection from "@/sections/BasicInfoSection";
import DiscountSection from "@/sections/DiscountSection";
import { useFormContext } from "@/contexts/FormContext";

export default function LoginForm() {
  const { handleSubmit } = useFormContext();

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <div id="loginForm" className="w-full">
      <div id="basicInfo">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col">
          <div>
            <BasicInfoSection />
          </div>
          <div>
            <ShutterSection />
          </div>
          <div>
            <DiscountSection />
          </div>
          <button type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
}
