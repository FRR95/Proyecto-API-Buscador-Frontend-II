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
import { validame } from "../../utils/functions";
import { CustomLink } from "../../components/CustomLink/CustomLink";


export const Login = () => {
  const navigate = useNavigate();

  //Instancia de Redux para escritura
  const dispatch = useDispatch();

const [LoadingSpinner,setLoadingSpinner] =useState(false)

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

  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  });

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const loginMe = async () => {
    setLoadingSpinner(true)
    const fetched = await loginService(user);

    if (fetched.token) {
      const decodificado = decodeToken(fetched.token);

      const passport = {
        token: fetched.token,
        user: decodificado,
      };

      dispatch(login({ credentials: passport }));
      toast(` 🙍‍♂️ ${fetched.message} Redireccionando a Home`)
      setLoadingSpinner(false)
      setTimeout(() => {
        navigate("/")
      }, 2500)
    }
    if (!fetched.success) {
      setLoadingSpinner(false)
      return toast.error(fetched.message)
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center login-design">
      <div className=" d-flex p-5 justify-content-center align-items-center flex-column registerBoxDesign">
        <h1>INICIA SESIÓN</h1>
        <label>Email</label>
        <CustomInput
          type="email"
          name="email"
          placeholder={"Email"}
          design={`input-design ${credencialesError.emailError !== "" ? "input-designError" : ""
            }`}
          value={user.email || ""}
          changeEmit={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{credencialesError.emailError}</div>
        <label>Password</label>
        <CustomInput
          type="password"
          name="password"
          placeholder={"Password"}
          design={`input-design ${credencialesError.passwordError !== "" ? "input-designError" : ""
            }`}
          value={user.password || ""}
          changeEmit={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{credencialesError.passwordError}</div>
        <CustomButton
          design={""}
          title={"Login"}
          onClick={loginMe} />
          {LoadingSpinner
          &&
          <div className="spinner-border text-light mt-1" role="status">
        
          </div> }
        
        <p>¿No tienes cuenta aún? <CustomLink path={"/register"} title={"Regístrate"} /></p>

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
    </div>
  );
};
