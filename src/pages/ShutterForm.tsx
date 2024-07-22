"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ShutterSection from "@/sections/ShutterSection";
import BasicInfoSection from "@/sections/BasicInfoSection";
import DiscountSection from "@/sections/DiscountSection";
import ButtonComponent from "@/components/ButtonComponent";
import { useContext, useEffect, useState, useCallback } from "react";
import AddCustomer from "@/sections/AddCustomer";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, editFormData } from "@/store/formSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "@/validators/shutterFormSchema";
import { FormType } from "@/types/basicInfoTypes";
import { AmountContext } from "@/contexts/AmountContext";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { RootState } from "@/store/store";

export default function ShutterForm():JSX.Element {
  const { finalAmount } = useContext(AmountContext) as {
    finalAmount: number;
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema),
    context:{finalAmount:finalAmount},
    defaultValues: {
      discountInfo: { discount: 0, discountType: "amount" },
      shutter: [
        {
          shutterName: "",
          width: "",
          height: "",
          area: 0,
        },
      ],
    },
  });

  const params: ReadonlyURLSearchParams | null = useSearchParams();
  const id: string | null | undefined = params?.get("id");

  const orderDetails = useSelector((state: RootState) => {
    if (!id) return undefined;
    return state.form.find((order, index) => index === +id);
  });

  useEffect(() => {
    if (orderDetails) {
      reset({
        basicInfo: {
          staffName: orderDetails.basicInfo.staffName,
          customerName: orderDetails.basicInfo.customerName,
          date: new Date(orderDetails.basicInfo.date)
            .toISOString()
            .split("T")[0],
        },
        shutter: orderDetails.shutter,
        discountInfo: {
          discountType: orderDetails.discountInfo.discountType,
          discount: +orderDetails.discountInfo.discount,
        },
      });
    }
  }, [id, orderDetails, reset]);

  const [isModal, setIsModal] = useState(false);

  const dispatch = useDispatch();
  const route = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data: FieldValues) => {
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
          date: data.basicInfo.date,
        },
        shutter: shutterData,
      };

      if (id) {
        dispatch(editFormData({ index: +id, data: formData }));
      } else {
        dispatch(addFormData(formData));
      }

      route.push("/list");
    },
    [dispatch, id, route]
  );

  return (
    <div id="shutterForm" className="w-full">
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

ShutterForm.displayName = "ShutterForm";
