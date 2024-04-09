import "./AdminPanel.css"
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, searchUsers } from "../../services/apiCalls";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { searchUserData, updateUserCriteria } from "../../app/slices/searchUserSlice";
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
                fetched = await searchUsers(rdxUser.credentials.token,searchUserRdx.criteriaUser); 
            }
            else{
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
         
console.log(`Criteria users ${searchUserRdx.criteriaUser}`)
    }, [searchUserRdx.criteriaUser])


    const AddInfoToFormUsers = async (user) => {
        setUserCredentials({
            _id: user._id,
            name: user.name
        })
    }

    const UpdateUserInfo = async (userId) => {
        const fetched = await UpdateProfile(userId, userCredentials, rdxUser.credentials.token)
        if (!fetched.success) {
            console.log(fetched.message)
        }

        console.log(fetched.message)


        setUserCredentials({
            _id: "",
            name: "",

        })

        BringUsers()
    }



    return (
        <div className="d-flex row    justify-content-center align-items-center adminPanelPageDesign" >

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    buttonDetailSection={``}
                                    buttonDetailTitle={`Ver ${user.name}`}
                                />
                            </div>

                        </>
                    )
                }
            )
            }
        </div>
    )
}