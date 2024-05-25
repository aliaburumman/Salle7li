export interface IGetWorkerResponse {
    [x: string]: any;
    description: any;
    id?: string
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    DOB: string;
    rating:number;
    city:string;
    jobTitle:string;
    startTime:string;
    endTime:string;

}
export interface IGetEditUser {
    id?: string
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    city:string;

}
export interface ICreateOrder {
    serviceType:string;
    dateOfService: string;
    availability_8_10:boolean;
    availability_10_12:boolean;
    availability_12_14:boolean;
    availability_14_16:boolean;
    availability_16_18:boolean;
    availability_18_20:boolean;
    availability_20_22:boolean;
    promoCode: string;
    worker_id:number;
    user_id:number;
    amount:number;

}

export interface IGetEditUserResponse {
    success:boolean;
}

export interface IGetCheckPromoCodeResponse {
    success:boolean;
    percentage:number;
}
