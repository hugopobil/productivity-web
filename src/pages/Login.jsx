import { useFormik } from "formik";
import { string, object } from "yup";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";
import "./Login.css"
import Button from "../components/Button";

const userSchema = object({
  email: string().email("Enter a valid email").required("Required field"),
  password: string()
    .min(8, "Password of at least 8 characters")
    .required("Required field"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values).then(() => {
        navigate("/posts")
      });
    },
    validationSchema: userSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  return (
    <div className="Login-Container">
      <div className="Form">
      <h1>Login</h1>
        <form onSubmit={handleSubmit} className="Login">
          <div className="input">
            <label htmlFor="email">Email:</label>
            <input 
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && <div>{errors.email}</div>}
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input 
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && <div>{errors.password}</div>}
          </div>
          <button type="submit" disabled={!isValid}>
            Login
          </button>
          <br />
          <p>If you dont have an account, please register using the following link:</p>
          <Button className="RegisterButton" linkTo="/register">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
