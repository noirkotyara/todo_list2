import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { logInThunk } from "../../../redux/auth/auth-reducer";


export const LogInPage = () => {
  const dispatch = useDispatch()
  

  const submitHandler = (values: LogInValuesType, actions: any) => {
    values && dispatch(logInThunk(values))
  }

  return (<div>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={submitHandler}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
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

export type LogInValuesType = {
  email: string,
  password: string,
}