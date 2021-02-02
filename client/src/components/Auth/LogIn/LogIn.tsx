import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, logInThunk } from "../../../redux/auth/auth-reducer";
import { useMessage } from "../../Common/Hooks/message";
import { getMessage } from './../../../redux/auth/auth-selectors';

export const LogInPage = () => {
  const errorWrap = useMessage()
  const errors = useSelector(getMessage)
  const dispatch = useDispatch()
  

  useEffect(() => {
    errorWrap(errors)
    dispatch(actions.setErrors(null))
  }, [errors])

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