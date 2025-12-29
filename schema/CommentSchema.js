import * as Yup from "yup";
export const CommentSchema = Yup.object({
    name: Yup.string().required("Please enter your Name").min(3),
    email: Yup.string().email("Enter a Valid Email Address").required("Please enter your email"),
    message: Yup.string().min(50).max(500).required("Please enter your Comment"),
  });
