import * as Yup from "yup";
export const OfferSchema = Yup.object({
    offerName: Yup.string().required("Please enter Offer Name").min(3),
    offerRange: Yup.string().required("Please enter Range").oneOf(['10 M - 14.9 M AED', '15 M - 24.9 M AED','25 M AED & Above'], 'Invalid offerRange'),
    termsAccept: Yup.boolean().oneOf([true], 'You must accept the terms and conditions to proceed')
    .required('Required'),
  });
