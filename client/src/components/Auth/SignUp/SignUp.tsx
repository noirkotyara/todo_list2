import { Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { signUpThunk } from "../../../redux/auth/auth-reducer"
import { getAuthMessage } from "../../../redux/auth/auth-selectors"
import { Form, Input } from 'formik-antd'
import styles from '../LogIn.module.scss'

type PropsType = {

}

export const SignUpPage: React.FC<PropsType> = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const errors = useSelector(getAuthMessage)

  const submitHandler = async (values: SignUpValuesType, actions: any) => {
    let response: any
    if (values) {
      response = await dispatch(signUpThunk(values))
      !errors && history.push('/login')
    }
  }

  return (<div>
    <div className={styles.title}>Create new user</div>
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
        <Form>
          <Input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            placeholder='First name'
            name="firstName"
          />
          <Input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            placeholder='Last name'
            name="lastName"
          />
          <Input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            placeholder='Email'
            name="email"
          />
          <Input
            type="password"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            placeholder='Password'
            name="password"
          />

          <button type="submit"><span>Submit</span></button>
        </Form>
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