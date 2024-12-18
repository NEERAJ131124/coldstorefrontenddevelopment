
// apiTypes.ts (This file holds your types/interfaces)
export interface LoginRequest {
    Email: string;
  }
  
  export interface OTPRequest {
    Email: string;
    Otp: string;
  }

  export interface EmailOTPRequest {
    Email: string;
    EmailOtp: string;
  }
  
  export interface MobileOTPRequest {
    PhoneNumber: string;
    PhoneOtp: string;
  }

  export interface RegistrationRequest {
    FirstName:string;
    LastName:string;
    Email: string;
    PhoneNumber:string;
  }

  export interface RegisterRequest {
    Email: string;
    Mobile:string;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    token:string;
  }
    