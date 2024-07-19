import React, { Dispatch, SetStateAction } from "react";
import ButtonComponent from "./ButtonComponent";
export default function ModalComponent({
  children,
  setIsModal,
}: {
  children: JSX.Element;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex justify-center z-50 ">
      <div className=" fixed z-50 justify-center items-center md:inset-0">
        <div className="relative p-4 max-w-sm justify-center flex ">
          <div className=" relative bg-slate-100 rounded-lg shadow">
            <div className="flex justify-end">
              <ButtonComponent
                label="Cancel"
                customClass="border border-red-500 text-red-500 m-2"
                handleClick={() => setIsModal(false)}
              />
            </div>
              {children}
          </div>
        </div>
      </div>
    </div>
  );
}
