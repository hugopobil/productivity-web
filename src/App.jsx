import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Posts from "./components/Posts";
import Login from "./pages/Login";
import Navbar from "./components/NavBar";
import TitleBar from "./components/TitleBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import NewPostForm from "./components/NewPostForm";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import Activation from "./components/Activation";
import Chrono from './pages/Chrono';
import ChatList from "./pages/ChatList";
import Chat from "./pages/Chat";
import NewChat from "./components/NewChat";
import Pomodoro from "./pages/Pomodoro";
import SetPomodoro from "./components/SetPomodoro";
import Followers from "./pages/Followers";
import Following from './pages/Following';
import EditProfile from './pages/EditProfile';

function App() {

  const user = useContext(AuthContext);

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
          <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path="/profile/me" element={<ProtectedRoute><Profile user={user} /></ProtectedRoute>}/>
          <Route path="/posts/create" element={<ProtectedRoute><NewPostForm/></ProtectedRoute>} />
          <Route path="/chrono" element={<ProtectedRoute><Chrono/></ProtectedRoute>} />
          <Route path="/chats/me" element={<ProtectedRoute><ChatList/></ProtectedRoute>}/>
          <Route path="/activate/:token" element={<Activation/>}/>
          <Route path="/chats/:chatId" element={<ProtectedRoute><Chat/></ProtectedRoute>}/>
          <Route path="/chats/create/:userId" element={<ProtectedRoute><NewChat/></ProtectedRoute>}/>
          <Route path="/pomodoro" element={<ProtectedRoute><Pomodoro/></ProtectedRoute>}/>
          <Route path="/pomodoro/setPomodoro" element={<ProtectedRoute><SetPomodoro/></ProtectedRoute>}/>
          <Route path="/followers/:id" element={<ProtectedRoute><Followers/></ProtectedRoute>}/>
          <Route path="/following/:id" element={<ProtectedRoute><Following/></ProtectedRoute>} />
          <Route path="/editprofile/:id" element={<ProtectedRoute><EditProfile/></ProtectedRoute>} /> 
        </Routes>

        {/* <UtilsBar /> */}
      </div>
    </div>
  );
}

export default App;
