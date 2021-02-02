import { Formik } from "formik"

export const LogInPage = () => {
    const submitHandler = (values: LogInValuesType, actions: any) => {
        alert(JSON.stringify(values) + JSON.stringify(actions))
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

type LogInValuesType = {
    email: string,
    password: string,
}