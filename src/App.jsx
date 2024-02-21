import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";
import Posts from "./components/Posts";
import Login from "./pages/Login";


function App() {
  return (
    <div className="App">
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          

        </Routes>
      </div>
    </div>
  );
}

export default App;
