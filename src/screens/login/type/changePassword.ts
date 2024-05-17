import * as Yup from "yup";
export type  EmailProp={
    email:string
}

export const initialEmailForChangePassword:EmailProp={
    email:""
}

export const validationSchemaForChangePassword= Yup.object().shape({
    email:Yup.string()
    .required("Please complete this field").email('please enter a valid email'),
})




export type resetPasswordRequestType={

    confirmPassword:string;
    password:string;
}
export const ResetPasswordRequest:resetPasswordRequestType={

    confirmPassword:"",
    password:"",
}

export const validationSchemaForResetPassword = Yup.object().shape({  

    password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
      'Password must have at least one (lowercase,uppercase,number,symbol) letters.',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
    
})