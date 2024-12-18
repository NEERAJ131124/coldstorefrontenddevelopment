import { toast } from 'react-toastify';
import { axiosApi } from '../../Config/apiConfig';
import { LoginRequest, OTPRequest, LoginResponse, RegisterRequest, RegistrationRequest, MobileOTPRequest, EmailOTPRequest } from '../apiTypes/authTypes';
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
    const response = await axiosApi.post<LoginResponse>('/login/login-or-signup', request);
    console.log(response)
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
      toast.error(error.response.data.message)
      throw new Error('Network Error');
  }
  }
}

export async function sendSignUpOTP(request: RegisterRequest) {
  try {
    // sendSMS();
    debugger;
    const response = await axiosApi.post('/user/register', request);
    console.log(response)
    if (response.status != 201) {
      throw new Error(`Failed to send OTP: ${response.status}`);
    }
    return response.data; // Axios automatically parses JSON
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

// Service to verify OTP
export async function verifyOTP(request: OTPRequest,navigate:any){
  try {
    const response = await axiosApi.post(`${process.env.REACT_APP_API_URL}/login/verify-otp`, request);
    if (response.status !== 200) {
      throw new Error(`Failed to verify OTP: ${response.status}`);
    }
    else{
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate(`${process.env.PUBLIC_URL}/dashboard/default`);
    }
  } catch (error: any) {
    console.log(error)
    if(error.code==="ERR_NETWORK"){
      throw new Error('Network Error');
  }
  else{
      console.error('Error fetching :', error);
      toast.error(error.response.data.message)
  }
  }
}

export async function submitSignUp(request: RegistrationRequest,navigate:any){
  try {
    const response = await axiosApi.post('user/createUser', request);
    console.log(response)
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




// Service to verify OTP
export async function verifyEmailOTP(request: EmailOTPRequest,navigate:any){
  try {
    // debugger;
    console.log(request)
    const response = await axiosApi.post('/user/verifyemailotp', request);
    console.log(response)
    if (response.status !== 200) {
      throw new Error(`Failed to verify OTP: ${response.status}`);
    }
    else{
      return response.data
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

export async function verifyMobileOTP(request: MobileOTPRequest,navigate:any){
  try {
    const response = await axiosApi.post('/user/verifyphoneotp', request);
    console.log(response)
    if (response.status !== 200) {
      throw new Error(`Failed to verify OTP: ${response.status}`);
    }
    else{
      return response.data
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