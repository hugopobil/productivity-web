import { useEffect, useState } from "react";
import { getUserByID, editUser } from "../services/UserService";
import { object, string, mixed } from "yup";
import { useFormik } from "formik";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUser = () => {
        getUserByID(userId)
          .then((response) => {
            setUser(response);
            // console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchUser();
    }
  }, [userId]);

  const userSchema = object({
    username: string().required("User Name required"),
    email: string().email("Enter a valid email").required("E-mail required"),
    password: string()
      .min(8, "Password of at least 8 characters")
      .required("Password required"),
    image: mixed().required("Photo required"),
  });

  const {
    values,
    errors,
    touched,
    isValid,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      image: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("image", values.image);

        editUser(user.id, formData)
        .then(() => {
          navigate(`/profile/${user.id}`);
        })
        .catch((error) => {
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
        <div className="edit-profile-input-div">
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
        <div className="edit-profile-input-div">
          <label htmlFor="username">User Name:</label>
          <input
            value={values.username}
            name="username"
            type="text"
            placeholder={user.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username}
        </div>
        <div className="edit-profile-input-div">
          <label htmlFor="email">E-mail:</label>
          <input
            value={values.email}
            name="email"
            type="email"
            placeholder={user.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email}
        </div>
        <div className="edit-profile-input-div">
          <label htmlFor="password">Password:</label>
          <input
            value={values.password}
            name="password"
            type="password"
            placeholder={"**************"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password}
        </div>
        <Button  className="edit-profile-submit" type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default EditProfile;
