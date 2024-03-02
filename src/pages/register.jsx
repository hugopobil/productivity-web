import { object, string, mixed } from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { register } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Register.css"

const userSchema = object({
  username: string().required('Required field'),
  email: string().email('Enter a valid email').required('Required field'),
  password: string().min(8, 'Password of ar least 8 characters').required('Required field'),
  image: mixed().required('Required field')
});

const Register = () => {
  const navigate = useNavigate()
  const { values, errors, touched, isValid, setFieldValue, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      image: ''
    },
    onSubmit: (values) => {
      const data = new FormData()
      Object.keys(values).forEach(keyValue => {
        data.append(keyValue, values[keyValue])
      })

      register(data)
        .then(() => {
          navigate('/login')
        })
        .catch(err => console.error(err))
    },
    validationSchema: userSchema,
    validateOnBlur: true,
    validateOnMount: true,
  })

  return (
    <div className="Register-container">
      <div className="Registation-form">
      <h1>Register</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Add your photo</label>
          <div><input
            name="image"
            type="file"
            onChange={(event) => {
              setFieldValue("image", event.currentTarget.files[0]);
            }}
            onBlur={handleBlur}
          />
          {touched.image && errors.image}
          </div>
          <div>
          <label htmlFor="username">User Name:</label>
          <input
            name="username"
            type="text"
            placeholder="Ex: Arnoldo Rogriguez"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur} />
            {touched.username && errors.username}
          </div>
          <div>
          <label htmlFor="email">E-mail:</label>
          <input
            name="email"
            type="email"
            placeholder="example@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur} />
            {touched.email && errors.email}
          </div>
          <div>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            placeholder="********"
            onChange={handleChange}
            onBlur={handleBlur} />
            {touched.email && errors.email}
          </div>
          <Button className="Register-button" type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
