import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store"; // Adjust this import based on your store setup
import { deleteFormData } from "@/store/formSlice"; // Adjust import based on your structure

const OrderListPage: React.FC = () => {
  const formDataArray = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const handleDelete = (index: number) => {
    dispatch(deleteFormData(index));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      {formDataArray.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Staff Name</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Discount</th>
              <th className="py-2 px-4 border-b">Payable Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formDataArray.map((formData, index) => {
              const totalPrice = formData.shutter.reduce(
                (sum, shutter) => sum + shutter.area,
                0
              );
              const discountAmount =
                formData.discountInfo.discountType === "percentage"
                  ? (totalPrice * Number(formData.discountInfo.discount)) / 100
                  : Number(formData.discountInfo.discount);
              const payablePrice = totalPrice - discountAmount;

              return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    {formData.basicInfo.customerName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formData.basicInfo.staffName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formData.basicInfo.date}
                  </td>
                  <td className="py-2 px-4 border-b">{totalPrice}</td>
                  <td className="py-2 px-4 border-b">{discountAmount}</td>
                  <td className="py-2 px-4 border-b">{payablePrice}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <button className="bg-blue-500 text-white py-1 px-3 rounded">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500">No data available.</div>
      )}
    </div>
  );
};

export default OrderListPage;
