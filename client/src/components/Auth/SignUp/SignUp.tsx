import { Formik } from "formik"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { actions, signUpThunk } from "../../../redux/auth/auth-reducer"
import { getMessage } from "../../../redux/auth/auth-selectors"
import { useMessage } from "../../Common/Hooks/message"
type PropsType = {
    
}

export const SignUpPage: React.FC<PropsType> = () => {
  const errorWrap = useMessage()
  const errors = useSelector(getMessage)
  const dispatch = useDispatch()
  const history = useHistory()
  
  useEffect(() => {
    errorWrap(errors)
    dispatch(actions.setErrors(null))
  }, [errors])
  
  
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