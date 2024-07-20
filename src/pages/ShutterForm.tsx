"use client";

import {
  FieldValues,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import ShutterSection from "@/sections/ShutterSection";
import BasicInfoSection from "@/sections/BasicInfoSection";
import DiscountSection from "@/sections/DiscountSection";
import ButtonComponent from "@/components/ButtonComponent";
import { useState } from "react";
import AddCustomer from "@/sections/AddCustomer";
import { useDispatch } from "react-redux";
import { addFormData } from "@/store/formSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "@/validators/shutterFormSchema";
import { FormType } from "@/types/basicInfoTypes";

export default function ShutterForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    setValue,
    control
  } = useForm<FormType>({ resolver: yupResolver(validationSchema) });

  const [isModal, setIsModal] = useState(false);

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
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
        date: data.basicInfo.date.toISOString().split("T")[0],
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
          <BasicInfoSection
            setIsModal={setIsModal}
            register={register}
            errors={errors}
          />
          <ShutterSection
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            control={control}
          />
          <DiscountSection register={register} errors={errors} />
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
