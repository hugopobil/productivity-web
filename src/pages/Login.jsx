import { useFormik } from "formik";
import { string, object } from "yup";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";

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
      console.log(values);
      login(values).then(() => navigate("/posts"));
    },
    validationSchema: userSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
      </form>
    </div>
  );
};

export default Login;
