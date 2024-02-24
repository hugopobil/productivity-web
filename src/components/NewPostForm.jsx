import { Formik, Form, Field, ErrorMessage } from "formik";
import { createPost } from "../services/PostService";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NewPostForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    content: "",
    image: "https://picsum.photos/200/300",
    location: "",
    user: user.id,
  };

  const handleSubmit = (values) => {
    createPost(values);
    navigate("/posts");
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Title is required";
    }

    if (!values.content) {
      errors.content = "Content is required";
    }

    if (!values.location) {
      errors.location = "Location is required";
    }

    if (!values.image) {
      errors.image = "Image is required";
    }

    if (!values.user) {
      errors.user = "User is required";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validateForm}
    >
      <Form>
        <div>
          <label htmlFor="title">Title</label>
          <Field type="text" id="title" name="title" />
          <ErrorMessage name="title" component="div" />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <Field as="textarea" id="content" name="content" />
          <ErrorMessage name="content" component="div" />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <Field type="text" id="location" name="location" />
          <ErrorMessage name="location" component="div" />
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <Field type="text" id="image" name="image" />
          <ErrorMessage name="image" component="div" />
        </div>

        <p>Post will be uplodaded by {user.username}</p>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default NewPostForm;
