export type Inputs = {
  basicInfo: {
    staffName: string;
    customerName: string;
    date: Date;
  };
  shutterInfo: {
    shutterType: string;
  };
};

export type BasicFieldsT = {
  label: string;
  name: string;
  type: string;
};

export interface FormType {
  basicInfo: {
    staffName: string;
    customerName: string;
    date: string;
  };
  shutter: {
    shutterName: string;
    width: string;
    height: string;
    area: number;
  }[];
  discountInfo: {
    discountType: string;
    discount: number;
  };
}
