
export interface ISendOTPResponse {
    otpToken: string;
  }
  
  export interface ISendOTPData {
    Email: string;
    Password:string;
  }

  export interface ISendOTPDataForResetPassword 
  {
    email:string;
  }

  export interface IResetPasswordData {
    Password:string;
  }
  export interface IResetPasswordBeforeLoginData {
    Email:string;
    Password:string;
  }
  export interface IVerifyOTPResponse {
    token: string;
    userId:number;
    success?:boolean;
    gender?:string;
    
  }
  
  export interface IVerifyOTPData {
    Otp: string;
    Email: string;
  }
  
  export interface ISignUpData {
    Email: string;
    Password: string;
    PasswordConfirm: string;
    FirstName: string;
    LastName: string;
    Gender: string;
    City : string;
    PhoneNumber:string;

  }
  
  
  export interface ISignUpResponse {
    success?: boolean;
      message?: string;
    
  }
  
  export interface ILocationData {
    Longitude: string;
    Latitude: string;
    Default: boolean;
    Mobile: string;
  }


 
  