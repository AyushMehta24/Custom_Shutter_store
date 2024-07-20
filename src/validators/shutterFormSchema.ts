import * as yup from "yup";

// Define the schema
const validationSchema = yup.object({
  basicInfo: yup.object({
    staffName: yup
      .string()
      .trim()
      .required("Staff Name is required and cannot be only spaces."),
    customerName: yup.string().trim().required("Customer Name is required."),
    date: yup.date().required("Date is required."),
  }),
  shutter: yup
    .array()
    .of(
      yup.object({
        shutterName: yup.string().required("Shutter Name is required."),
        width: yup
          .number()
          .positive("Width must be a positive number.")
          .required("Width is required."),
        height: yup
          .number()
          .positive("Height must be a positive number.")
          .required("Height is required."),
        area: yup.number().positive("Area must be a positive number."),
      })
    )
    .min(1, "At least one row in Shutter Section is required."),
  discountInfo: yup.object({
    discountType: yup
      .string()
      .oneOf(
        ["amount", "percentage"],
        "Discount Type must be either 'amount' or 'percentage'"
      )
      .required("Discount Type is required."),
    discount: yup
      .number()
      .required("Discount is required.")
      .test(
        "is-valid-amount",
        "Discount cannot be greater than the final amount",
        function (value) {
          // Custom logic for 'amount' type validation
          if (this.parent.discountType === "amount") {
            return value <= this.options.context.finalAmount;
          }
          return true;
        }
      )
      .test(
        "is-valid-percentage",
        "Discount must be between 0 and 100.",
        function (value) {
          // Custom logic for 'percentage' type validation
          if (this.parent.discountType === "percentage") {
            return value >= 0 && value <= 100;
          }
          return true;
        }
      ),
  }),
});

export default validationSchema;
