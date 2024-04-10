import { useNavigate } from "react-router-dom"
import "./Register.css"
import { useState } from "react"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { registerService } from "../../services/apiCalls"

import { ToastContainer, toast } from 'react-toastify';

export const Register = () => {
    const navigate = useNavigate()
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

    const signInMe = async () => {
        const fetched = await registerService(userCredentials)

        if (!fetched.success) {
            toast.error(`${fetched.message}`)
        }

        setTimeout(() => {
            navigate("/login")
        }, 2500);

        toast(`${fetched.message} Te llevamos a login`)
    }

    return (
        <div className=" d-flex justify-content-center align-items-center flex-column registerDesign">
            <CustomInput
                type="text"
                name="name"
                design="input-design"
                value={userCredentials.name || ""}
                changeEmit={inputHandler}
            />
            <CustomInput
                type="email"
                name="email"
                design="input-design"
                value={userCredentials.email || ""}
                changeEmit={inputHandler}
            />
            <CustomInput
                type="password"
                name="password"
                design="input-design"
                value={userCredentials.password || ""}
                changeEmit={inputHandler}
            />
            <CustomButton
                design={""}
                title={"Register"}
                onClick={signInMe} />

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
    )

}