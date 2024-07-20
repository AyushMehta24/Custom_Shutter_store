"use client";

import ButtonComponent from "@/components/ButtonComponent";
import CustomerInput from "@/components/CustomerInputComponent";
import ModalComponent from "@/components/ModalComponent";
import { addCustomer, customerT } from "@/store/customerSlice";
import { BasicFieldsT } from "@/types/basicInfoTypes";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const customerInfoFields: BasicFieldsT[] = [
  {
    label: "Name",
    name: "customerName",
    type: "text",
  },
  {
    label: "Email",
    name: "customerEmail",
    type: "text",
  },
  {
    label: "Contact",
    name: "customerContact",
    type: "text",
  },
];

export default function AddCustomer({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<customerT>();
  const dispatch = useDispatch();

  const onSubmit = (data: customerT) => {
    dispatch(addCustomer(data));
    setIsModal(false);
  };

  return (
    <ModalComponent setIsModal={setIsModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col z-10 realtive gap-5 p-5 ">
          {customerInfoFields.map((field: BasicFieldsT): JSX.Element => {
            return (
              <CustomerInput
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                register={register}
                errors={errors}
                customClass="w-full"
              />
            );
          })}
        </div>
        <div className="flex justify-end m-2">
          <ButtonComponent
            type="submit"
            label={"Proceed"}
            customClass={"mb-3 mr-1 text-green-500 border-green-500"}
          />
        </div>
      </form>
    </ModalComponent>
  );
}
