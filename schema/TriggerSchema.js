import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const TriggerSchema = Yup.object({
    name: Yup.string().required("Please enter your Name").min(3),
    email: Yup.string().email("Enter a Valid Email Address").required("Please enter your email"),
    mobile: Yup.string().required("Please Enter Mobile Number").matches(phoneRegExp, 'Phone number is not valid'),
    city: Yup.string().required("Please enter your City Name").min(3)
  });
