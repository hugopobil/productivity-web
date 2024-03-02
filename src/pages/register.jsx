import { Formik, Form, Field, ErrorMessage } from "formik";
import { register } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "./Register.css"

const Register = () => {

  const navigate = useNavigate();
  
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    register(values).then(() => navigate("/login"));
  };

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "username is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  return (
    <div className="Register-container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        <Form className="Registation-form">
        <h1>Registration</h1>
          <div className="input">
            <label htmlFor="username">User Name</label>
            <Field className="field" type="text" id="username" name="username" />
            <ErrorMessage name="userName" component="div" />
          </div>

          <div className="input">
            <label htmlFor="email">E-mail</label>
            <Field className="field" type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>
            <Field className="field" type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button className="Register-button" type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
