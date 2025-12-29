import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const SignUpSchema = Yup.object({
    fullName: Yup.string().required("Please enter your Full Name").min(3),
    email: Yup.string().email("Enter a Valid Email Address").required("Please enter your email"),
    mobile: Yup.string().required("Please Enter Mobile Number").matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string().required("Please enter your password").min(8,"Password must be at least 8 characters"),
  });
