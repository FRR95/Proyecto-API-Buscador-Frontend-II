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
        console.log(rdxUser, " credenciales pasaporte");
    }, [rdxUser]);

  



    return (
        <div className=" d-flex justify-content-center align-items-center header-design">
         
            <CustomLink
                path="/" title="Home" />
            {rdxUser?.credentials?.token ? (
                <div className="navigator-design">
                    <CustomLink path="/profile" title={rdxUser?.credentials?.user?.name} />
                    <div
                        className="out-design"
                        onClick={() => dispatch(logout({ credentials: "" }))}
                    >
                        log out
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
