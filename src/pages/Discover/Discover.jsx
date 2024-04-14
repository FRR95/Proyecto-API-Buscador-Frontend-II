import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice"
import { useSelector, useDispatch } from "react-redux";
import "./Discover.css"
import { useEffect, useState } from "react";
import { LikeDislikePost, UpdateProfile, deleteMyPost, getPosts, getUsers, updateMyPost } from "../../services/apiCalls";
import { PostCard } from "../../components/PostCard/PostCard";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { updatePostDetail } from "../../app/slices/postDetailSlice";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { updateProfileDetail } from "../../app/slices/profileDetailSlice";
import { ToastContainer, toast } from 'react-toastify';
import { TextArea } from "../../components/TextArea/TextArea";

export const Discover = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rdxUser = useSelector(userData)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])











  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

  const BringUsers = async () => {
    try {


      const fetched = await getUsers(rdxUser.credentials.token)
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


  const BringPosts = async () => {
    try {


      const fetched = await getPosts(rdxUser.credentials.token)
      setPosts(fetched.data)



    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if (rdxUser?.credentials.token) {
      if (posts.length === 0) {
        BringPosts()
      }
    }

  }, [posts])




  // CRUD POSTS



  const manageDetail = (post) => {
    //1. guardamos en RDX
    const dispatched = dispatch(updatePostDetail({ post }));
    //2. navegamos a la vista de detalle
    navigate("/postdetail");
  };
  const manageUserDetail = (user) => {
    //1. guardamos en RDX
    const dispatched = dispatch(updateProfileDetail({ user }));
    
    //2. navegamos a la vista de detalle
    navigate("/profiledetail");
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
    <div className="d-flex row    justify-content-center align-items-center discoverPageDesign">




      {posts.length > 0
        ? (
          <div className="d-flex  row justify-content-center align-items-center">
            <h3 className="mt-5">Ver usuarios</h3>
            {users.map(
              user => {
                return (

                  <>

                    <div className="d-flex  justify-content-center align-items-center">
                      <ProfileCard
                        username={user.name}
                        email={user.email}
                        followFollowingSection={"d-none"}
                        buttonSectionDesign={"d-flex justify-content-around"}
                        buttonEditSection={`d-none`}
                        buttonEditTitle={`Editar ${user.name}`}
                        buttonDeleteSection={`d-none`}
                        buttonDeleteTitle={`Borrar ${user.name}`}
                        buttonDetailSection={`d-flex`}
                        buttonDetailTitle={`Ver perfil de ${user.name}`}
                        emitDetailButton={() => manageUserDetail(user)}
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
      {posts.length > 0
        ? (
          <div>
            <h3 className="mt-5">Ver posts</h3>
            {posts.map(
              post => {
                return (

                  <>

                    <div className="d-flex  justify-content-center align-items-center">
                      <PostCard
                        buttonsSection={"d-flex justify-content-start"}
                        buttonLikeSection={"d-flex justify-content-end"}
                        emitLikeButton={() => likeUnlikePost(post._id)}
                        buttonDeleteSection={"d-none"}
                        buttonDeleteTitle={"Borrar post"}
                        buttonEditSection={"d-none"}
                        buttonEditTitle={"Editar post"}
                        buttonDetailSection={"d-flex justify-content-center m-1  align-items-center"}
                        buttonDetailTitle={"Ver post"}
                        // userName={post.userId.email}
                        title={post.title}
                        description={post.description}
                        datePost={new Date(post.createdAt).toDateString()}
                        numberOflikes={post.numberOfLikes.length}
                        emitDetailButton={() => manageDetail(post)}
                       
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