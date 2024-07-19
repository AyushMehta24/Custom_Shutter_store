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

const initialState: FormData = {
  discountInfo: { discountType: "", discount: "" },
  basicInfo: { staffName: "", customerName: "", date: "" },
  shutter: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      return { ...action.payload };
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
