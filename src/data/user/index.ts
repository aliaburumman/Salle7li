export type Locale = 'en' | 'ar';
export const initialState: UserState = {
    language: 'en',
    isLoggedIn: false,
    userId:-1,
    phoneNumber: '',
    
};



export interface UserState {
    language: Locale;
    token?: string;
    isLoggedIn?: boolean;
    userId?:number;
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
    
};
