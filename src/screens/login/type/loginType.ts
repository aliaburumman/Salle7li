import * as Yup from "yup";

export type loginRequestType={

    email:string;
    password:string;
}
export const LoginRequest:loginRequestType={

    email:"",
    password:"",
}

export const validationSchema = Yup.object().shape({  

    email:Yup.string()
    .required("Please complete this field").email('please enter a valid email'),

    
    password: Yup.string()
    .required('No password provided.'),
    
})