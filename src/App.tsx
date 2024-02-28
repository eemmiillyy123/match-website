import DemoLogin from "@/pages/DemoLogin/login";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AccessDenied from "./pages/AccessDenied";
import DemoRegister from "./pages/DemoRegister/register";
import DemoIndex from "./pages/DemoIndex";
import DemoHome from "./pages/DemoHome/home";
import DemoAddPost from "./pages/DemoAddPost/addPost";
import Individual from "./pages/Individual/individual";
import PostByBoard from "./pages/PostByBoard/selectPostByBoard";
// import { Individual } from "./pages/Individual/individual";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DemoIndex />} />
        <Route path="/register" element={<DemoRegister />} />
        <Route path="/login" element={<DemoLogin />} />
        <Route path="/home" element={<DemoHome />} />
        <Route path="/addPost" element={<DemoAddPost />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/accessDenied" element={<AccessDenied />} />
        <Route path="/selectPost" element={<PostByBoard />} />
      </Routes>
    </div>
  );
}

export default App;
