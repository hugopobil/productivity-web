import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Posts from "./components/Posts";
import Login from "./pages/Login";
import Navbar from "../src/components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import NewPostForm from "./components/NewPostForm";


function App() {
  return (
    <div className="App">
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<ProtectedRoute><Posts/></ProtectedRoute>} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/posts/create" element={<ProtectedRoute><NewPostForm/></ProtectedRoute>} />
        </Routes>

        {/* <UtilsBar /> */}
      </div>
    </div>
  );
}

export default App;
