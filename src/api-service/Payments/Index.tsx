import axios from "axios";

// Define a TypeScript type for the payload
interface PaymentPayload {
  merchantId: string;
  merchantTransactionId: string;
  merchantUserId: string;
  amount: number;
  redirectUrl: string;
  redirectMode: string;
  callbackUrl: string;
  mobileNumber: string;
  paymentInstrument: {
    type: string;
  };
}

// Define a function to make the API call
export const makePaymentApiCall = async (payload: PaymentPayload): Promise<any> => {
 
};
