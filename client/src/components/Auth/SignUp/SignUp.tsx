import { Formik, FormikValues } from "formik"
import { useDispatch } from "react-redux"
import { InitialStateType, signUpThunk } from "../../../redux/auth/auth-reducer"
type PropsType = {
    
}

export const SignUpPage: React.FC<PropsType> = () => {
  const dispatch = useDispatch()
    const submitHandler = (values: SignUpValuesType, actions: any) => {
    //  alert(JSON.stringify(values))
    //  const value: any = JSON.stringify(values)

    values && dispatch(signUpThunk(values))
    }
    // const handleChange = event => {
    //     setValues(prevValues => ({
    //       ...prevValues,
    //       // we use the name to tell Formik which key of `values` to update
    //       [event.target.name]: event.target.value
    //     });
    //   }
    
    return (<div>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }}
            onSubmit={submitHandler}
        >
       {props => (
         <form onSubmit={props.handleSubmit}>
           <input
             type="text"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             placeholder='First name'
             name="firstName"
           />
           <input
             type="text"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             placeholder='Last name'
             name="lastName"
           />
           <input
             type="text"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             placeholder='Email'
             name="email"
           />
           <input
             type="password"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             placeholder='Password'
             name="password"
           />
           
           <button type="submit">Submit</button>
         </form> 
       )}
     </Formik>
    </div>)
}

export type SignUpValuesType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}