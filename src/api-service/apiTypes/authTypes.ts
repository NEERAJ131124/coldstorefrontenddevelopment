
// apiTypes.ts (This file holds your types/interfaces)
export interface LoginRequest {
    Email: string;
  }
  
  export interface OTPRequest {
    Email: string;
    Otp: string;
  }

  export interface OTPRegistrationRequest {
    FirstName:string;
    LastName:string;
    Email: string;
    Mobile:string;
    EmailOTP: string;
    MobileOTP: string;
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
    