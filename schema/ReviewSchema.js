import * as Yup from "yup";
export const ReviewSchema = Yup.object({
    rating: Yup.string()
      .oneOf(["1", "2", "3", "4", "5"], "Please select a rating")
      .required("Please select a rating"),
    name: Yup.string().required("Please enter your name"),
    review: Yup.string()
      .min(20, "Review must be at least 20 characters")
      .max(200, "Review cannot exceed 200 characters")
      .required("Please enter your Review"),
  });
