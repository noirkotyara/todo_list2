import { Formik } from "formik";
import { Form, Input } from 'formik-antd'
import React from "react";
import { useDispatch } from "react-redux";
import { logInThunk } from "../../../redux/auth/auth-reducer";
import { Preloader } from "../../Common/Preloader/Preloader";
import styles from '../LogIn.module.scss';

export const LogInPage = () => {
  const dispatch = useDispatch()
  

  const submitHandler = (values: LogInValuesType, actions: any) => {
    values && dispatch(logInThunk(values))
  }

  return (<div>
    <div className={styles.title}>Log In here</div>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={submitHandler}
    >
      {props => (
        <Form>
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

export type LogInValuesType = {
  email: string,
  password: string,
}