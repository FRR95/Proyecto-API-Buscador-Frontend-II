import "./Login.css";
import { useState } from "react";

import { loginService } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { ToastContainer, toast } from 'react-toastify';
//Redux

import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";

export const Login = () => {
  const navigate = useNavigate();

  //Instancia de Redux para escritura
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginMe = async () => {
    const fetched = await loginService(user);

    if (fetched.token) {
      const decodificado = decodeToken(fetched.token);

      const passport = {
        token: fetched.token,
        user: decodificado,
      };

      dispatch(login({ credentials: passport }));
      toast(` 🙍‍♂️ ${fetched.message} Redireccionando a Home`)
      setTimeout(() => {
        navigate("/")
      }, 2500)
    }
    if (!fetched.success) {
      toast.error(`${fetched.message}`)
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center login-design">
      <CustomInput
        type="email"
        name="email"
        design="input-design"
        value={user.email || ""}
        changeEmit={inputHandler}
      />
      <CustomInput
        type="password"
        name="password"
        design="input-design"
        value={user.password || ""}
        changeEmit={inputHandler}
      />
      <CustomButton
        design={""}
        title={"Login"}
        onClick={loginMe} />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition:Bounce
      />
    </div>
  );
};
