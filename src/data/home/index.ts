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

export interface IGetEditUserResponse {
    success:boolean;
}
