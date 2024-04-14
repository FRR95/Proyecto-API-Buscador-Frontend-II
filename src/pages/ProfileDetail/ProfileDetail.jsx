
import "./ProfileDetail.css"

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileDetailCard } from "../../components/ProfileDetailCard/ProfileDetailCard";
import { profileDetailData } from "../../app/slices/profileDetailSlice";
import { userData } from "../../app/slices/userSlice";
import { FollowUnfollowUserService, GetUserPostsByUserId, LikeDislikePost, deleteMyPost, updateMyPost } from "../../services/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import { PostCard } from "../../components/PostCard/PostCard";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { TextArea } from "../../components/TextArea/TextArea";

export const ProfileDetail = () => {
    const detailRdx = useSelector(profileDetailData);
    const rdxUser = useSelector(userData)
    const [userPosts, setUserPosts] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [postCredentials, setPostCredentials] = useState({
        _id: "",
        title: "",
        description: "",
    });

    const postHandler = (e) => {
        console.log(e.target.value)
        setPostCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (!detailRdx?.user?._id) {
            navigate("/");
        }
    }, [detailRdx]);

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])


    const bringUserPosts = async () => {
        const fetched = await GetUserPostsByUserId(detailRdx?.user?._id, rdxUser.credentials.token)
        if (!fetched.success) {
            console.log(fetched.message)
        }
        console.log(fetched)
        setUserPosts(fetched.data)
    }

    useEffect(() => {
        if (userPosts.length === 0) {
            bringUserPosts()
        }


    }, [userPosts])

    const FollowUnfollowUser = async (userId) => {
        try {
            const fetched = await FollowUnfollowUserService(userId, rdxUser.credentials.token)
            if (!fetched.success) {
                toast.error(`${fetched.message}`)
            }
            toast(`🙍‍♂️ ${fetched.message}`)
        } catch (error) {

        }

    }

    const likeUnlikePost = async (postId) => {

        try {
            const fetched = await LikeDislikePost(postId, rdxUser.credentials.token)

            if (!fetched.success) {
                toast.error(`${fetched.message}`)
            }
            toast(`💗 ${fetched.message}`)
            bringUserPosts()

        } catch (error) {
            toast.error(`${error}`)
        }
    }

    const AddInfoToForm = async (post) => {
        setPostCredentials({
            _id: post._id,
            title: post.title,
            description: post.description
        })

        console.log(postCredentials)


    }

    // CRUD POSTS

    const DeletePost = async (postId) => {
        const fetched = await deleteMyPost(postId, rdxUser.credentials.token)
        if (!fetched.success) {
            toast.error(`${fetched.message}`)
        }
        toast(`🗑 ${fetched.message}`)
        bringUserPosts()

    }




    const updatePost = async (postId) => {
     if(postCredentials.title ==="" || postCredentials.description === ""){
        return toast.error(`Todos los campos son requeridos`)
     }
        const fetched = await updateMyPost(postId, postCredentials, rdxUser.credentials.token)
        if (!fetched.success) {
           return toast.error(fetched.message)
        }

        toast.warn(fetched.message)
        bringUserPosts()

        setPostCredentials({
            _id: "",
            title: "",
            description: ""
        })
    }

    return (
        <>
            <div className="d-flex row justify-content-center align-items-center profileDetailDesign">
                <div className="modal fade" id="exampleModalPost" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Editar post</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">


                                <CustomInput
                                    type="text"
                                    name="title"
                                    design={"input-design"}
                                    value={postCredentials.title || ""}
                                    changeEmit={postHandler}
                                />
                                <TextArea
                                    type="text"
                                    name="description"
                                    design={"input-design"}
                                    value={postCredentials.description || ""}
                                    changeEmit={postHandler}
                                />
                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn  buttonEditDesign" data-bs-dismiss="modal" onClick={() => updatePost(postCredentials._id)} ><i className="bi bi-pen-fill"></i>{`Editar`}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    detailRdx?.user?._id
                    &&
                    <div className="d-flex row-sm row-xs col-lg col-xl justify-content-center align-items-center">
                        <ProfileDetailCard
                            username={detailRdx?.user.name}
                            email={detailRdx?.user.email}
                            createdAt={new Date(detailRdx?.user.createdAt).toDateString()}
                            numberOfFollowers={detailRdx?.user.followers.length}
                            numberOfFollowing={detailRdx?.user.following.length}
                            buttonFollowUnfollowEmit={() => FollowUnfollowUser(detailRdx?.user?._id)}
                            buttonFollowUnfollowDesign={""}
                            buttonFollowUnfollowTitle={`Seguir a ${detailRdx?.user.name}`}
                        />
                    </div>


                }

                {userPosts.length > 0
                    ? (

                        <div className="d-flex col-lg col-xl row-sm row-xs    justify-content-center align-items-center">
                            <div>
                                <h3 className="mt-5">Posts de {detailRdx?.user.name}</h3>

                                {userPosts.map(
                                    post => {
                                        return (

                                            <>



                                                <PostCard
                                                    buttonsSection={rdxUser?.credentials?.user?.roleName === "admin" ? ("d-flex justify-content-start") : ("d-none")}
                                                    buttonLikeSection={"d-flex justify-content-end"}
                                                    emitLikeButton={() => likeUnlikePost(post._id)}
                                                    buttonDeleteSection={"d-flex justify-content-center m-1   align-items-center"}
                                                    buttonDeleteTitle={"Borrar post"}
                                                    buttonEditSection={"d-flex justify-content-center m-1   align-items-center"}
                                                    buttonEditTitle={"Editar post"}
                                                    buttonDetailSection={"d-none"}
                                                    buttonDetailTitle={"Ver post"}
                                                    title={post.title}
                                                    description={post.description}
                                                    datePost={new Date(post.createdAt).toDateString()}
                                                    numberOflikes={post.numberOfLikes.length}
                                                    emitDeleteButton={() => DeletePost(post._id)}
                                                    emitEditButton={() => AddInfoToForm(post)}
                                                />



                                            </>
                                        )
                                    }
                                )
                                }
                            </div>
                        </div>)
                    : (<h3>{`${detailRdx?.user.name}`} aun no tiene posts</h3>)
                }

            </div>

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

        </>
    )
}