import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { Profile } from "../../pages/Profile/Profile";
import { PostDetail } from "../../pages/PostDetail/PostDetail";
import { Discover } from "../../pages/Discover/Discover";
import { AdminPanel } from "../../pages/AdminPanel/AdminPanel";



export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} replace/>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/postdetail" element={<PostDetail />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
    </Routes>
  );
};
