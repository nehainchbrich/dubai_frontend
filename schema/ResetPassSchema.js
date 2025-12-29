import * as Yup from "yup";
export const ResetPassSchema = Yup.object({
    password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters"),
  cpassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
