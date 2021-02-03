import { Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { signUpThunk } from "../../../redux/auth/auth-reducer"
import { getAuthMessage } from "../../../redux/auth/auth-selectors"
type PropsType = {
    
}

export const SignUpPage: React.FC<PropsType> = () => {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const errors = useSelector(getAuthMessage)
  
    const submitHandler = async (values: SignUpValuesType, actions: any) => {
      let response: any
      if(values){
        response = await dispatch(signUpThunk(values))
        !errors && history.push('/login')
      }
    }
    
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