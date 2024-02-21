import { useFormik } from "formik";
import { string, object } from "yup";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const userSchema = object({
    email: string().email('Enter a valid email').required('Required field'),
    password: string().min(8, 'Password of at least 8 characters').required('Required field')
}); 

const Login = () => {
    const { Login } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            login(values)
                .then(() => navigate('/profile'))
        },
        validationSchema: userSchema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
    })

    return(
        <div>

        </div>
    )
}

export default Login;

