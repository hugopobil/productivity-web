import { object, string, mixed } from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { createPost } from "../services/PostService";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./NewPostForm.css"


const newPostSchema = object({
  title: string().required('Tittle required'),
  content: string().required('Content rquired'),
  location: string().required('Location required'),
  image: mixed().required('Image required'),
  user: string().required('User required'),
});

const NewPostForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { values, errors, touched, isValid, setFieldValue, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      title: '',
      content: '',
      location: '',
      image: '',
      duraiton: '',
      user: user.id,
    }, 
    onSubmit: (values) => {
      const data = new FormData()
      Object.keys(values).forEach(keyValue => {
        data.append(keyValue, values[keyValue])
      })

      createPost(data)
        .then(() => {
          navigate("/posts")
        })
        .catch(err => console.error(err))
    },
    validationSchema: newPostSchema,
    validateOnBlur: true,
    validateOnMount: true,
  })
  

  return (
    <div className="newPost-container">
      
      <h1>New Post</h1>
      <div className="newPost-form">
      
        <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="image">Add photo</label>
          <input
            name="image"
            type="file"
            className="custom-upload-button"
            onChange={(event) => {
              setFieldValue("image", event.currentTarget.files[0]);
            }}
            onBlur={handleBlur}
          />
          {touched.image && errors.image}
        </div>
        <div className="form-input">
          <label htmlFor="title">Title:</label>
          <input  
            name="title"
            type="text"
            placeholder="Project 1"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur} />
            {touched.title && errors.title}
        </div>
        <div className="form-input">
          <label htmlFor="title">Score from Pomodoro:</label>
          <input  
            name="duration"
            type="number"
            placeholder="Project 1"
            value={values.duration}
            onChange={handleChange}
            onBlur={handleBlur} />
            {touched.duraiton && errors.title}
        </div>
        <div className="form-input">
          <label htmlFor="content">Content:</label>
          <br />
          <textarea  
            name="content"
            type="text"
            placeholder="Project 1"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur} />
            {touched.content && 
            errors.content}
        </div>
        <div className="form-input">
          <label htmlFor="location">Location:</label>
          <input  
            name="location"
            type="text"
            placeholder="Project 1"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur} />
            {touched.location && errors.location}
        </div>
        <Button className="Create-button" type="submit">Create</Button>
        </form>
      </div>
    </div>
  );
};


export default NewPostForm;


