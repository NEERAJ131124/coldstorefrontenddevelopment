import { toast } from 'react-toastify';
import { axiosApi } from '../../Config/apiConfig';
import { LoginRequest, OTPRequest, LoginResponse, RegisterRequest, OTPRegistrationRequest } from '../apiTypes/authTypes';
import axios from 'axios';

const sendSMS = async () => {
  const username = "KiviOtp";
  const apikey = "dmLa64WyuAkR2xVHsVzvd2AJ0HDWpHDB";
  const signature = "KiviOtp"; // Example: TELSP
  const mobile = "7860236978"; // Recipient's mobile number
  const entityId = "221202"; // DLT entity ID
  const templateId = "786786"; // Approved template ID
  const OTP = "123456";  // OTP value

  const url = 'https://api.telsp.in/pushapi/sendbulkmsg';
  const params = {
    username,
    apikey,
    signature,
    dest: mobile,
    msgtype: 'PM',
    msgtxt: OTP,
    entityid: entityId,
    templateid: templateId,
    custref: `REF-${Date.now()}`
  };
  try {
    const response = await axios.post(url, params); // POST request
    console.log("SMS Sent Successfully:", response.data);
  } catch (error:any) {
    console.error("Error sending SMS:", error.response ? error.response.data : error.message);
  }
};

// Service to send OTP
export async function sendOTP(request: LoginRequest): Promise<LoginResponse> {
  try {
    // sendSMS();
    debugger;
    const response = await axiosApi.post<LoginResponse>('/login/login-or-signup', request);
    if (response.status !== 200) {
      throw new Error(`Failed to send OTP: ${response.status}`);
    }
    return response.data; // Axios automatically parses JSON
  } catch (error: any) {
    if(error.code==="ERR_NETWORK"){
      throw new Error('Network Error');
  }
  else{
      console.error('Error fetching :', error);
      throw new Error('Network Error');
  }
  }
}

export async function sendSignUpOTP(request: RegisterRequest) {
  try {
    // sendSMS();
    debugger;
    const response = await axiosApi.post('/login/signup', request);
    if (response.status !== 200) {
      throw new Error(`Failed to send OTP: ${response.status}`);
    }
    return response.data; // Axios automatically parses JSON
  } catch (error: any) {
    if(error.code==="ERR_NETWORK"){
      throw new Error('Network Error');
  }
  else{
      console.error('Error fetching :', error);
      throw new Error('Network Error');
  }
  }
}

// Service to verify OTP
export async function verifyOTP(request: OTPRequest,navigate:any){
  try {
    debugger;
    const response = await axiosApi.post('/login/verify-otp', request);

    if (response.status !== 200) {
      throw new Error(`Failed to verify OTP: ${response.status}`);
    }
    else{
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate(`${process.env.PUBLIC_URL}/dashboard/default`);
    }
  } catch (error: any) {
    if(error.code==="ERR_NETWORK"){
      throw new Error('Network Error');
  }
  else{
      console.error('Error fetching :', error);
      toast.error(error.response.data.message)
  }
  }
}

export async function verifySignUpOTP(request: OTPRegistrationRequest,navigate:any){
  try {
    debugger;
    const response = await axiosApi.post('/login/verify-signup-otp', request);

    if (response.status !== 200) {
      throw new Error(`Failed to verify OTP: ${response.status}`);
    }
    else{
      const token = response.data.token;
      localStorage.setItem('token', token);
      // navigate(`${process.env.PUBLIC_URL}/dashboard/default`);
    }
  } catch (error: any) {
    if(error.code==="ERR_NETWORK"){
      navigate('/errors/error_503')
      throw new Error('Network Error');
      
  }
  else{
      console.error('Error fetching :', error);
      toast.error(error.response.data.message)
  }
  }
}
