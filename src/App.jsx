import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
            {/* <Route path="/profile" element={<h1>Profile</h1>} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
