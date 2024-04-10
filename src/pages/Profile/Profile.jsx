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

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdxUser = useSelector(userData)

  const [loadedData, setLoadedData] = useState(false);





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
    const fetched = await UpdateProfile(user,rdxUser.credentials.token)
    
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
    const fetched = await CreatePost(rdxUser.credentials.token, postCredentials)
    if (!fetched.success) {
      toast.error(fetched.message)
    }
    toast(`✔ ${fetched.message}`)

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

      <div className="modal fade" id="exampleModalProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Modal Profile update</p>

              <CustomInput
                type="text"
                name="name"
                value={user.name || ""}
                changeEmit={inputHandler}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>editProfile(user._id)} >{`Editar `}</button>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="exampleModalPost" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={ClearForm} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Modal Post update</p>

              <CustomInput
              type="text"
              name="title"
              design={"input-design"}
              value={postCredentials.title || ""}
              changeEmit={postHandler}
            />
              <CustomInput
              type="text"
              name="description"
              design={"input-design-big"}
              value={postCredentials.description || ""}
              changeEmit={postHandler}
            />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={ClearForm} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => updatePost(postCredentials._id)} >{`Editar `}</button>
            </div>
          </div>
        </div>
      </div>
        

            <div className="d-flex justify-content-center row  align-items-center">
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

        

        <div className="d-flex mt-5 justify-content-center row  align-items-center">
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
            <CustomInput
              type="text"
              name="description"
              design={"input-design-big"}
              value={postCredentials.description || ""}
              changeEmit={postHandler}
            />
          </div>
          <div className="d-flex justify-content-center   align-items-center">
            <CustomButton
              onClick={createPost}
              design={"m-1"}
              title={`Post`}
              icon={"bi bi-sticky-fill"}
            />
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
                          datePost={post.createdAt}
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
          : (<p>No tienes posts aun</p>)
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