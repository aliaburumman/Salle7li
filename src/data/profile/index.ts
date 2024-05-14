export interface IGetUserProfileResponse {
    id?: string
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phoneNumber: string;
    DOB: string;
    rating:number;
    walletBalance: number;
    city:string;

}
export interface IGetEditUser {
    id?: string
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    city:string;

}

export interface IGetEditUserResponse {
    success:boolean;
}
