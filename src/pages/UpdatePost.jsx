import { object, string, mixed } from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { updatePost, getPost } from "../services/PostService"; // Importa la función para obtener y actualizar publicaciones
import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react"; // Importa useState y useEffect para manejar el estado de la publicación existente
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import "./UpdatePost.css";

const editPostSchema = object({
  title: string().required("Título requerido"),
  content: string().required("Contenido requerido"),
  location: string().required("Ubicación requerida"),
  image: mixed().required("Imagen requerida"),
  user: string().required("Usuario requerido"),
});

const UpdatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const { values, errors, touched, isValid, setFieldValue, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      title: "",
      content: "",
      location: "",
      image: "",
      duration: "",
      user: user.id,
    },
    onSubmit: (values) => {
      const data = new FormData();
      Object.keys(values).forEach((keyValue) => {
        data.append(keyValue, values[keyValue]);
      });

      updatePost(id, data) // Llama a la función para actualizar la publicación existente
        .then(() => {
          navigate("/posts");
        })
        .catch((err) => console.error(err));
    },
    validationSchema: editPostSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });

  useEffect(() => {
    // Obtiene la publicación existente cuando el componente se monta
    getPost(id)
      .then((fetchedPost) => {
        setPost(fetchedPost);
        // Llena el formulario con los datos de la publicación existente
        setFieldValue("title", fetchedPost.title);
        setFieldValue("content", fetchedPost.content);
        setFieldValue("location", fetchedPost.location);
        setFieldValue("image", fetchedPost.image);
        setFieldValue("duration", fetchedPost.duration);
      })
      .catch((err) => console.error(err));
  }, [id, setFieldValue]);

  if (!post) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="newPost-container">
      <h1>Edit Post</h1>
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
              onBlur={handleBlur}
            />
            {touched.title && errors.title}
          </div>
          <div className="form-input">
            <label htmlFor="duration">Score from Pomodoro:</label>
            <input
              name="duration"
              type="number"
              placeholder="Project 1"
              value={values.duration}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.duration && errors.duration}
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
              onBlur={handleBlur}
            />
            {touched.content && errors.content}
          </div>
          <div className="form-input">
            <label htmlFor="location">Location:</label>
            <input
              name="location"
              type="text"
              placeholder="Project 1"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.location && errors.location}
          </div>
          <Button className="Create-button" type="submit">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
