export type Locale = 'en' | 'ar';
export type theme = 'dark' | 'bright';
export const initialState: UserState = {
    language: 'en',
    isLoggedIn: false,
    theme:'dark',
    userId:-1,
    phoneNumber: '',
    gender:'',
    
};



export interface UserState {
    language: Locale;
    token?: string;
    isLoggedIn?: boolean;
    theme?:theme;
    userId?:number;
    gender?:string;
    phoneNumber: string;
    
}

export type Tokens = {
    token?: string;

    isBlocked?: boolean;
    profileCompleted?: boolean;
};




export const loggedOutState: UserState = {
    language: 'en',
    token:undefined,
    phoneNumber: '',
    theme:'dark',
    gender:''

    
};
