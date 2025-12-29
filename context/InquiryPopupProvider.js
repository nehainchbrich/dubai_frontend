import {useContext} from 'react';
import InquiryPopupContex from './InquiryPopupContex';

export function InquiryPopupProvider({ children, mcqData }) {
  return (
    <InquiryPopupContex.Provider value={mcqData}>
      {children}
    </InquiryPopupContex.Provider>
  );
}

export function useMCQ() {
  const mcqData = useContext(InquiryPopupContex);
  return mcqData;
}
