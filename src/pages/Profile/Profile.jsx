import { useNavigate } from "react-router-dom";
import "./Profile.css"
import { updatePostDetail } from "../../app/slices/postDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { CreatePost, GetProfile, GetUserPosts, LikeDislikePost, UpdateProfile, deleteMyPost, updateMyPost } from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PostCard } from "../../components/PostCard/PostCard";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextArea } from "../../components/TextArea/TextArea";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdxUser = useSelector(userData)

  const [loadedData, setLoadedData] = useState(false);
  const [LoadingSpinner, setLoadingSpinner] = useState(false)




  const [user, setUser] = useState({
    following: "",
    followers: "",
    name: "",
    email: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const [postCredentials, setPostCredentials] = useState({
    _id: "",
    title: "",
    description: "",
  });

  const postHandler = (e) => {

    setPostCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [posts, setPosts] = useState([]);

  const BringPosts = async () => {
    try {


      const fetched = await GetUserPosts(rdxUser.credentials.token)
      setPosts(fetched.data)




    } catch (error) {
      console.log(error)
    }

  }



  useEffect(() => {
    if (posts.length === 0) {
      BringPosts()
    }

  }, [posts])


  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

  const getUserProfile = async () => {
    try {

      const fetched = await GetProfile(rdxUser.credentials.token);
      setLoadedData(true);


      setUser({
        following: fetched.data.following,
        followers: fetched.data.followers,
        name: fetched.data.name,
        email: fetched.data.email,
      });


    } catch (error) {
      toast.error(`${fetched.message}`)
    }
  };



  const editProfile = async () => {
    const fetched = await UpdateProfile(user, rdxUser.credentials.token)

    console.log(`Credentials ${user.name}`)
    if (!fetched.success) {
      toast.error(fetched.message)
    }

    toast.warn(fetched.message)

    setTimeout(() => {
      getUserProfile()

    }, 500);

  }

  const createPost = async () => {
    setLoadingSpinner(true)
    for (let elemento in postCredentials) {
      if (postCredentials[elemento] === "") {
          setLoadingSpinner(false)
        throw new Error("Todos los campos tienen que estar rellenos");
      }
    }
    const fetched = await CreatePost(rdxUser.credentials.token, postCredentials)
    if (!fetched.success) {
      setLoadingSpinner(false)
      return toast.error(fetched.message)

    }
    toast(`✔ ${fetched.message}`)
    setLoadingSpinner(false)

    setPostCredentials({
      title: "",
      email: "",
    });

    BringPosts()
  }

  const deletePost = async (postId) => {
    const fetched = await deleteMyPost(postId, rdxUser.credentials.token)
    if (!fetched.success) {
      toast.error(fetched.message)
    }
    toast(`🗑 ${fetched.message}`)
    BringPosts()

  }

  const updatePost = async (postId) => {
    const fetched = await updateMyPost(postId, postCredentials, rdxUser.credentials.token)
    if (!fetched.success) {
      toast.error(fetched.message)
    }

    toast.warn(fetched.message)
    BringPosts()

    setPostCredentials({
      _id: "",
      title: "",
      description: ""
    })
  }

  const AddInfoToForm = async (post) => {
    setPostCredentials({
      _id: post._id,
      title: post.title,
      description: post.description
    })

    console.log(postCredentials)
  }
  const ClearForm = async (post) => {
    setPostCredentials({
      _id: "",
      title: "",
      description: ""
    })


  }



  useEffect(() => {

    if (!loadedData) {
      getUserProfile();
    }

  }, [user])


  const manageDetail = (post) => {
    //1. guardamos en RDX
    const dispatched = dispatch(updatePostDetail({ post }));

    //2. navegamos a la vista de detalle
    navigate("/postdetail");
  };

  const likeUnlikePost = async (postId) => {

    try {
      const fetched = await LikeDislikePost(postId, rdxUser.credentials.token)

      if (!fetched.success) {
        toast.error(`${fetched.message}`)
      }
      toast(`💗 ${fetched.message}`)
      BringPosts()

    } catch (error) {
      toast.error(`${error}`)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center row  align-items-center profileDesign">

        <div className="modal fade " id="exampleModalProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edita tu usuario</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">


                <CustomInput
                  type="text"
                  name="name"
                  value={user.name || ""}
                  changeEmit={inputHandler}
                />
              </div>
              <div className="modal-footer">

                <button type="button" className="btn buttonEditDesign " data-bs-dismiss="modal" onClick={() => editProfile(user._id)} ><i className="bi bi-pen-fill"></i>{`Editar`}</button>
              </div>
            </div>
          </div>
        </div>


        <div className="modal fade" id="exampleModalPost" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Post</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={ClearForm} aria-label="Close"></button>
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
                <button type="button" className="btn buttonEditDesign" data-bs-dismiss="modal" onClick={() => updatePost(postCredentials._id)} ><i className="bi bi-pen-fill"></i>{`Editar`}</button>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex row justify-content-center     align-items-center">
          <div className="d-flex col-xl  col-lg  row-sm row-xs justify-content-center   align-items-center">
            <ProfileCard
              idUser={"idUser"}
              key={"key"}
              username={user.name}
              email={user.email}
              buttonSectionDesign={"d-flex row justify-content-center align-items-center"}

              buttonDeleteSection={"d-none"}
              buttonDetailSection={"d-none"}
              buttonEditSection={"d-flex col justify-content-center align-items-center"}
              buttonEditTitle={`Editar ${user.name}`}

              buttonEditDesign={"buttonEditDesign"}

              followFollowingSection={"d-flex row justify-content-center align-items-center"}
              buttonFollowerSection={"d-flex col justify-content-center align-items-center"}
              numberOfFollowers={user.followers.length}
              buttonFollowingSection={"d-flex col justify-content-center align-items-center"}
              numberOfFollowing={user.following.length}


            />
          </div>



          <div className="d-flex col-xl  col-lg  row-sm row-xs mt-5 justify-content-center   align-items-center">
            <div className="d-flex row mt-5 justify-content-center   align-items-center">
              <div className="d-flex justify-content-center row  align-items-center">
                <p>Titulo</p>
                <CustomInput
                  type="text"
                  name="title"
                  design={"input-design"}
                  value={postCredentials.title || ""}
                  changeEmit={postHandler}
                />
              </div>
              <div className="d-flex justify-content-center row  align-items-center">
                <p>Descripción</p>
                <TextArea
                  type="text"
                  name="description"
                  design={"input-design"}
                  value={postCredentials.description || ""}
                  changeEmit={postHandler}
                />
              </div>
              <div className="d-flex justify-content-center   align-items-center">
                <CustomButton
                  onClick={createPost}
                  design={"m-1 buttonDetailDesign"}
                  title={`Post`}
                  icon={"bi bi-sticky-fill"}
                />
              </div>
              {LoadingSpinner
                &&
                <div className="spinner-border text-light mt-1" role="status">

                </div>}
            </div>
          </div>
        </div>




        {posts.length > 0
          ? (
            <div>
              {posts.map(
                post => {
                  return (

                    <>

                      <div className="d-flex  justify-content-center align-items-center">
                        <PostCard
                          buttonsSection={"d-flex justify-content-start"}
                          buttonLikeSection={"d-flex justify-content-end"}
                          buttonDeleteSection={"d-flex justify-content-center m-1   align-items-center"}
                          buttonDeleteTitle={"Borrar post"}
                          buttonEditSection={"d-flex justify-content-center m-1   align-items-center"}
                          buttonEditTitle={"Editar post"}
                          buttonDetailSection={"d-flex justify-content-center m-1  align-items-center"}
                          buttonDetailTitle={"Ver post"}
                          userName={user.name}
                          title={post.title}
                          description={post.description}
                          datePost={new Date(post.createdAt).toDateString()}
                          numberOflikes={post.numberOfLikes.length}
                          emitEditButton={() => AddInfoToForm(post)}
                          emitDeleteButton={() => deletePost(post._id)}
                          emitDetailButton={() => manageDetail(post)}
                          emitLikeButton={() => likeUnlikePost(post._id)}
                        />
                      </div>

                    </>
                  )
                }
              )
              }
            </div>)
          : (<h3>No tienes posts aun</h3>)
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

    </>)
}