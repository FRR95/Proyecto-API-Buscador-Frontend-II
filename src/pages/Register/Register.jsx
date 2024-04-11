import { useNavigate } from "react-router-dom"
import "./Register.css"
import { useState } from "react"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { registerService } from "../../services/apiCalls"

import { ToastContainer, toast } from 'react-toastify';
import { validame } from "../../utils/functions"
import { CustomLink } from "../../components/CustomLink/CustomLink"

export const Register = () => {
    const navigate = useNavigate()
    const [LoadingSpinner, setLoadingSpinner] = useState(false)
    const [userCredentials, setUser] = useState({
        name: "",
        password: "",
        email: ""
    })

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
    });

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    const signInMe = async () => {
        setLoadingSpinner(true)
        const fetched = await registerService(userCredentials)

        if (!fetched.success) {
            setLoadingSpinner(false)
            return toast.error(fetched.message)
        }

        setTimeout(() => {
            navigate("/login")
        }, 2500);

        setLoadingSpinner(false)

        toast(`${fetched.message} Te llevamos a login`)
    }

    return (
        <div className=" d-flex justify-content-center align-items-center flex-column registerDesign">
            <div className=" d-flex p-5 justify-content-center align-items-center flex-column registerBoxDesign">
                <h1>REGÍSTRATE</h1>
                <label>Nombre</label>
                <CustomInput
                    type="text"
                    name="name"
                    placeholder={"Nombre"}
                    design={`input-design ${userError.nameError !== "" ? "input-designError" : ""
                        }`}
                    value={userCredentials.name || ""}
                    changeEmit={inputHandler}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.nameError}</div>
                <label>Email</label>
                <CustomInput
                    type="email"
                    name="email"
                    placeholder={"Email"}
                    design={`input-design ${userError.emailError !== "" ? "input-designError" : ""
                        }`}
                    value={userCredentials.email || ""}
                    changeEmit={inputHandler}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.emailError}</div>
                <label>Password</label>
                <CustomInput
                    type="password"
                    name="password"
                    placeholder={"Pssword"}
                    design={`input-design ${userError.passwordError !== "" ? "input-designError" : ""
                        }`}
                    value={userCredentials.password || ""}
                    changeEmit={inputHandler}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.passwordError}</div>
                <CustomButton
                    design={""}
                    title={"Register"}
                    onClick={signInMe} />

                {LoadingSpinner
                    &&
                    <div class="spinner-border text-light mt-1" role="status">

                    </div>}

                <p>¿Ya tienes cuenta? <CustomLink path={"/login"} title={"Inicia sesión"} /></p>

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
    )

}