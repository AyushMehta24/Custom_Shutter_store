import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Shutter {
  shutterName: string;
  width: string;
  height: string;
  area: number;
}

interface DiscountInfo {
  discountType: string;
  discount: string;
}

interface BasicInfo {
  staffName: string;
  customerName: string;
  date: string;
}

interface FormData {
  discountInfo: DiscountInfo;
  basicInfo: BasicInfo;
  shutter: Shutter[];
}

const initialState: FormData[] = []; // Changed to an array

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
    deleteFormData: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1); 
    },
    editFormData: (
      state,
      action: PayloadAction<{ index: number; data: FormData }>
    ) => {
      state[action.payload.index] = action.payload.data; // Update form data at the specified index
    },
  },
});

export const { addFormData, deleteFormData, editFormData } = formSlice.actions;
export default formSlice.reducer;
