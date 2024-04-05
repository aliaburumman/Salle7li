import * as Yup from "yup";





export type RestaurantRegistrationRequest= {
    confirmPassword: string;

    firstName: string;

    lastName: string;

    password: string;

    city: string;

    email: string;

    phoneNumber:string;

}

export const initialValues: RestaurantRegistrationRequest = {
    firstName: "",

    lastName: "",

    password: "",

    confirmPassword:"",
    city: "",
    email: "",
    phoneNumber:""

   


   

  


  
}


export const validationSchema = Yup.object().shape({
    
    firstName: Yup.string().required("Please complete this field"),

    lastName: Yup.string().required("Please complete this field"),

    

        password: Yup.string()
          .required('No password provided.')
          .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
            'Password must have at least one (lowercase,uppercase,number,symbol) letters.'
          ),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Password confirmation is required'),
      

    

    


          phoneNumber: Yup.string()
          .required("Please complete this field")
          .matches(/^(079|078|077)\d{7}$/, 'Please enter a valid Jordanian Number'),

    email:Yup.string()
    .required("Please complete this field")
    .email("Invalid email address"),

    city: Yup.string().required("Please complete this field"),

});
