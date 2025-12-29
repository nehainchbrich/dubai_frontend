import * as Yup from "yup";
export const ForgetSchema = Yup.object({
    username: Yup.string().required("Please enter a username").test("is-email-or-mobile","Please enter a valid email or mobile number",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^\d{10}$/;
        return emailRegex.test(value) || mobileRegex.test(value);
      }
    ),
  });
