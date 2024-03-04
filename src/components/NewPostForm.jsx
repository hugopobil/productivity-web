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
      <div className="newPost-form">
      <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Add photo</label>
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
        <div>
          <label htmlFor="content">Content:</label>
          <input  
            name="content"
            type="text"
            placeholder="Project 1"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur} />
            {touched.content && errors.content}
        </div>
        <div>
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


// const NewPostForm = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const initialValues = {
//     title: "",
//     content: "",
//     image: "https://picsum.photos/200/300",
//     location: "",
//     user: user.id,
//   };

//   const handleSubmit = (values) => {
//     createPost(values);
//     navigate("/posts");
//   };

//   const validateForm = (values) => {
//     const errors = {};

//     if (!values.title) {
//       errors.title = "Title is required";
//     }

//     if (!values.content) {
//       errors.content = "Content is required";
//     }

//     if (!values.location) {
//       errors.location = "Location is required";
//     }

//     if (!values.image) {
//       errors.image = "Image is required";
//     }

//     if (!values.user) {
//       errors.user = "User is required";
//     }

//     return errors;
//   };

//   return (
    
//     <Formik
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validate={validateForm}
//     >
//       <Form>
//         <div>
//           <label htmlFor="title">Title</label>
//           <Field type="text" id="title" name="title" />
//           <ErrorMessage name="title" component="div" />
//         </div>

//         <div>
//           <label htmlFor="content">Content</label>
//           <Field as="textarea" id="content" name="content" />
//           <ErrorMessage name="content" component="div" />
//         </div>

//         <div>
//           <label htmlFor="location">Location</label>
//           <Field type="text" id="location" name="location" />
//           <ErrorMessage name="location" component="div" />
//         </div>

//         <div>
//           <label htmlFor="image">Image</label>
//           <Field type="text" id="image" name="image" />
//           <ErrorMessage name="image" component="div" />
//         </div>

//         <p>Post will be uplodaded by {user.username}</p>

//         <button type="submit">Submit</button>
//       </Form>
//     </Formik>
//   );
// };
  