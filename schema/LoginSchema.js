import * as Yup from "yup";
export const LoginSchema = Yup.object({
    username: Yup.string().required("Please enter a username").test("is-email-or-mobile","Please enter a valid email or mobile number",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^\d{10}$/;
        return emailRegex.test(value) || mobileRegex.test(value);
      }
    ),
    password: Yup.string().required("Please enter your password"),
  });
