import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const isPdfFile = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return extension === 'pdf';
  };
export const CareerSchema = Yup.object({
    fullname: Yup.string().required("Please enter your Full Name").min(3),
    email: Yup.string().email("Enter a Valid Email Address").required("Please enter your email"),
    mobile: Yup.string().required("Please Enter Mobile Number").matches(phoneRegExp, 'Phone number is not valid'),
    resume: Yup.mixed()
    .required('A file is required')
    .test('fileFormat', 'Only PDF files are allowed', (value) => {
      if (!value) {
        return false;
      }
      return isPdfFile(value);
    }),
    weblink: Yup.string(),
   description: Yup.string().min(20).max(500).required("Please enter your Cover Letter"),
  });
  