import * as Yup from "yup";
export const ValidateSchema = Yup.object({
    otp: Yup.number().required("Please enter your OTP"),
  });
