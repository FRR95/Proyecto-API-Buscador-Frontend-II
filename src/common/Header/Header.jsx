import "./Header.css";



//RDX

import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";

import { useEffect } from "react";

import { CustomLink } from "../../components/CustomLink/CustomLink";
import { useNavigate } from "react-router-dom";


export const Header = () => {
    //Instancia de conexion a modo lectura
    const rdxUser = useSelector(userData);

    //Instancia de conexion a modo escritura
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
    }, [rdxUser]);



    const goHome = () => {
        navigate("/");
    };

    return (
        <div className=" d-flex justify-content-center align-items-center header-design">
            <img className="logoImg" onClick={goHome} src="../public/imgs/logosocialmedia.png" alt="" />

            <CustomLink
                path="/" title="Home" />
            {rdxUser?.credentials?.token ? (
                <div className="d-flex justify-content-center align-items-center navigator-design">
                    <CustomLink path="/profile" title={rdxUser?.credentials?.user?.username} />
                    <CustomLink path="/discover" title={"@ Descubre"} />
                    <div
                        onClick={() => dispatch(logout({ credentials: "" }))}
                    >

                        <CustomLink path="/" title={"LogOut"} />
                    </div>
                    {rdxUser?.credentials?.user?.roleName === "admin" && <CustomLink path="/adminpanel" title={"Admin Panel"} />}
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center navigator-design">
                    <CustomLink path="/login" title={"Login"} />
                    <CustomLink path="/register" title={"Register"} />
                </div>
            )}
        </div>
    );
};
