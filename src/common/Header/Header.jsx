import "./Header.css";



//RDX

import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";

import { useEffect } from "react";

import { CustomLink } from "../../components/CustomLink/CustomLink";


export const Header = () => {
    //Instancia de conexion a modo lectura
    const rdxUser = useSelector(userData);

    //Instancia de conexion a modo escritura
    const dispatch = useDispatch();

    useEffect(() => {
    }, [rdxUser]);





    return (
        <div className=" d-flex justify-content-center align-items-center header-design">

            <CustomLink
                path="/" title="Home" />
            {rdxUser?.credentials?.token ? (
                <div className="d-flex justify-content-center align-items-center navigator-design">
                    <CustomLink path="/profile" title={rdxUser?.credentials?.user?.username} />
                    <div
                        onClick={() => dispatch(logout({ credentials: "" }))}
                    >

                        <CustomLink path="/" title={"LogOut"} />
                    </div>
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
