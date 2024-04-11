import "./AdminPanel.css"
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UpdateProfile, UpdateUserProfile, deleteUsers, getUsers, searchUsers } from "../../services/apiCalls";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { searchUserData, updateUserCriteria } from "../../app/slices/searchUserSlice";
import { ToastContainer, toast } from 'react-toastify';
import { updateProfileDetail } from "../../app/slices/profileDetailSlice";
export const AdminPanel = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const rdxUser = useSelector(userData)
    const searchUserRdx = useSelector(searchUserData);

    const [criteria, setCriteria] = useState("");

    const searchHandler = (e) => {
        setCriteria(e.target.value);
    };

    useEffect(() => {
        const searching = setTimeout(() => {
            dispatch(updateUserCriteria(criteria));
        }, 375);

        return () => clearTimeout(searching);
    }, [criteria]);

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])
    useEffect(() => {
        if (rdxUser?.credentials?.user?.roleName !== "admin") {
            navigate("/")
        }
    }, [rdxUser])

    const [users, setUsers] = useState([])
    const [userCredentials, setUserCredentials] = useState(
        {
            _id: "",
            name: ""
        }
    )

    const inputUserHandler = (e) => {
        setUserCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const BringUsers = async () => {
        try {

            let fetched
            if (searchUserRdx.criteriaUser !== "") {
                fetched = await searchUsers(rdxUser.credentials.token, searchUserRdx.criteriaUser);
            }
            else {
                fetched = await getUsers(rdxUser.credentials.token)
            }

            setUsers(fetched.data)



        } catch (error) {
            console.log(error)
        }

    }



    useEffect(() => {
        if (rdxUser?.credentials.token) {
            if (users.length === 0) {
                BringUsers()
            }
        }

    }, [users])

    useEffect(() => {

        BringUsers()

    }, [searchUserRdx.criteriaUser])


    const AddInfoToFormUsers = async (user) => {
        setUserCredentials({
            _id: user._id,
            name: user.name
        })
    }

    const UpdateUserInfo = async (userId) => {
        const fetched = await UpdateUserProfile(userId, userCredentials, rdxUser.credentials.token)
        if (!fetched.success) {
            toast.error(`${fetched.message}`)
        }

        toast.warn(`${fetched.message}`)


        setUserCredentials({
            _id: "",
            name: "",

        })

        BringUsers()
    }

    const manageUserDetail = (user) => {
        //1. guardamos en RDX
        const dispatched = dispatch(updateProfileDetail({ user }));
        console.log(dispatched)
        //2. navegamos a la vista de detalle
        navigate("/profiledetail");
      };

     const DeleteUser =async(userId)=>{
        try {
            const fetched = await deleteUsers(userId,rdxUser.credentials.token)
            if(!fetched.success){
                toast.error(fetched.message)
            }

            toast(`🗑 ${fetched.message}`)
            
            BringUsers()


        } catch (error) {
            toast.error(error)
        }
     }

    return (
        <div className="d-flex row    justify-content-center align-items-center adminPanelPageDesign" >

            <div className="modal fade" id="exampleModalProfile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CustomInput
                                placeholder={"Name"}
                                type={"text"}
                                name={"name"}
                                value={userCredentials.name || ""}
                                changeEmit={inputUserHandler}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => UpdateUserInfo(userCredentials._id)} >{`Editar ${userCredentials.name}`}</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="mt-5">Ver usuarios</h3>

            <CustomInput
                placeholder={"Buscar usuarios por email"}
                type={"email"}
                name={"email"}
                design={"input-design"}
                value={criteria || ""}
                changeEmit={searchHandler}
            />

            {users.map(
                user => {
                    return (

                        <>

                            <div className="d-flex  justify-content-center align-items-center">
                                <ProfileCard
                                    buttonSectionDesign={rdxUser?.credentials?.user?.roleName === "admin" ? ("d-flex justify-content-around") : ("d-none")}
                                    username={user.name}
                                    email={user.email}
                                    followFollowingSection={"d-none "}
                                    buttonEditSection={``}
                                    buttonEditTitle={`Editar ${user.name}`}
                                    emitEditButton={() => AddInfoToFormUsers(user)}
                                    buttonDeleteSection={``}
                                    buttonDeleteTitle={`Borrar ${user.name}`}
                                    emitDeleteButton={() => DeleteUser(user._id)}
                                    buttonDetailSection={``}
                                    buttonDetailTitle={`Ver ${user.name}`}
                                    emitDetailButton={() => manageUserDetail(user)}
                                />
                            </div>



                        </>
                    )
                }
            )
            }

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