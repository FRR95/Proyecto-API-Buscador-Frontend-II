import { useNavigate } from "react-router-dom"
import "./Register.css"
import { useState } from "react"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { registerService } from "../../services/apiCalls"

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

      const signInMe = async()=>{
        const fetched =await registerService(userCredentials)

        if(!fetched.success){
            console.log(fetched.message)
        }

        setTimeout(() => {
           navigate("/login") 
        }, 500);
      }

    return (
        <div className=" d-flex justify-content-center align-items-center flex-column registerDesign">
            <CustomInput
                type="text"
                name="name"
                value={userCredentials.name || ""}
                changeEmit={inputHandler}
            />
            <CustomInput
                type="email"
                name="email"
                value={userCredentials.email || ""}
                changeEmit={inputHandler}
            />
            <CustomInput
                type="password"
                name="password"
                value={userCredentials.password || ""}
                changeEmit={inputHandler}
            />
            <CustomButton
                design={""}
                title={"Register"}
                onClick={signInMe} />
        </div>
    )

}