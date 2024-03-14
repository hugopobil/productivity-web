import { useEffect, useState } from "react";
import { getUserByID, editUser } from "../services/UserService";
import { object, string, mixed } from "yup";
import { useFormik } from "formik";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css"

const EditProfile = () => {

    const params = useParams();
    const userId = params.id;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
      if (userId) {
        const fetchUser = () => {
          getUserByID(userId) 
            .then(response => {
              setUser(response);
              console.log(response)
            })
            .catch(error => {
              console.error(error);
            });
        };
    
        fetchUser();
      }
    }, [userId]);
  
    const userSchema = object({
      username: string().required('User Name required'),
      email: string().email('Enter a valid email').required('E-mail required'),
      password: string().min(8, 'Password of at least 8 characters').required('Password required'),
      image: mixed().required('Photo required')
    });
  
    const { values, errors, touched, isValid, setFieldValue, handleSubmit, handleChange, handleBlur } = useFormik({
      initialValues: {
        username: user?.username || '',
        email: user?.email || '',
        password: '',
        image: ''
      },
      onSubmit: (values) => {
        editUser(user._id, values)
          .then(() => {
            navigate(`/profile/${userId}`);
          })
          .catch(error => {
            console.error(error);
          });
      },
      validationSchema: userSchema,
      validateOnBlur: true,
      validateOnMount: true,
    });
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="Profile-container">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="image">Profile Image</label>
            <input
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
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.username && errors.username}
          </div>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password}
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </div>
    );
};

export default EditProfile;