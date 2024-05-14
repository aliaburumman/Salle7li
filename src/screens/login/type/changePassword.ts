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