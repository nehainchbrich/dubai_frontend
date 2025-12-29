import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const ExpoSchema = Yup.object({
    name: Yup.string().required("Please enter your Name").min(3),
    email: Yup.string().email("Enter a Valid Email Address").required("Please enter your email"),
    mobile: Yup.string().required("Please Enter Mobile Number").matches(phoneRegExp, 'Phone number is not valid'),
    city: Yup.string().required("Please enter your city"),
    occupation: Yup.string().required("Please enter your city").oneOf(['Government Employee', 'Self-Employed','Business Owner','Private Sector Employee','Retired','Freelancer','Others'], 'Invalid Occupations'),
    occupation_other: Yup.string().test('isRequired', 'Please Add your Occupations', function(value, context) {
      const { occupation } = context.parent;
      return occupation === 'Others' ? !!value : true;
  }),
    interest: Yup.string().required("Please enter Interest").min(3),
    eventName: Yup.string().required("Please enter Event Name").min(3),
    refer: Yup.string().nullable().notRequired().min(3, 'Please enter at least 3 characters'),
    slot: Yup.string().required('Please select anyone from Options').oneOf(['10-12 PM', '12-02 PM','02-04 PM','04-06 PM','06-08 PM','08-10 PM'], 'Invalid Slot'),
    agent: Yup.string().notOneOf(['SELECT'], 'Please select a valid option')
    .default('Inchbrick'),
    visitcountry: Yup.string().default('None of Above').oneOf(['U.K', 'Dubai', 'Singapore', 'Thailand', 'None of Above'],'Invalid interest'),
    expodate: Yup.date().required('Please select a date')
  });
