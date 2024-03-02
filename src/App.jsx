import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Posts from "./components/Posts";
import Login from "./pages/Login";
import Navbar from "./components/NavBar";
import TitleBar from "./components/TitleBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import NewPostForm from "./components/NewPostForm";
// import Activation from "./components/Activation";

function App() {
  return (
    <div className="App">
      <TitleBar/>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Posts/></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<ProtectedRoute><Posts/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path="/posts/create" element={<ProtectedRoute><NewPostForm/></ProtectedRoute>} />
        </Routes>

        {/* <UtilsBar /> */}
      </div>
    </div>
  );
}

export default App;
