import { useEffect, useState } from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { LikeDislikePost, getTimeline } from "../../services/apiCalls";
import { PostCard } from "../../components/PostCard/PostCard";

import { ToastContainer, toast } from 'react-toastify';
import { CustomLink } from "../../components/CustomLink/CustomLink";

export const Home = () => {
  //Instancia de Redux en modo lectura para home

  const rdxUser = useSelector(userData)

  const [followingPost, setFollowingPost] = useState([])

  const BringTimelinePosts = async () => {
    try {


      const fetched = await getTimeline(rdxUser.credentials.token)
      setFollowingPost(fetched.data)



    } catch (error) {
      toast.error(error)
    }

  }

  useEffect(() => {

  }, [rdxUser])

  useEffect(() => {
    if (rdxUser?.credentials.token) {
      if (followingPost.length === 0) {
        BringTimelinePosts()
      }
    }

  }, [followingPost])



  const likeUnlikePost = async (postId) => {

    try {
      const fetched = await LikeDislikePost(postId, rdxUser.credentials.token)

      if (!fetched.success) {
        toast.error(`${fetched.message}`)
      }
      toast(`💗 ${fetched.message}`)
      BringTimelinePosts()

    } catch (error) {
      toast.error(error)
    }
  }







  return (
    <>
      {!rdxUser?.credentials.token
        ? (<div className="  d-flex row   justify-content-center align-items-center home-design">

          <div className="  d-flex col-xl  col-lg  row-sm row-xs   justify-content-center align-items-center ">
            <div className="  d-flex row p-5  justify-content-center align-items-center rightBlockDesign ">
              <img src="https://www.investopedia.com/thmb/tFHjCFL9uLlgj5_yQ6xt6WzH7iQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/social-media-final-8f48359ac9e7486eaf40932f4a9e2597.png" height="320em" width={"380em"} alt="SocialMedia" />
            </div>
          </div>
          <div className="  d-flex col-xl  col-lg  row-sm row-xs justify-content-center align-items-center ">
            <div className="  d-flex row p-5  justify-content-center align-items-center rightBlockDesign ">
              <h3>Bienvenido a SocialMedia</h3>
              <p> <CustomLink path={"/register"} title={"Regístrate"} />  o <CustomLink path={"/login"} title={"Inicia sesión"} /> para acceder a nuestra red social</p>
            </div>
          </div>

        </div>)
        : (<div className=" d-flex  justify-content-center align-items-center home-design">
          {followingPost.length > 0
            ? (<div>
              {followingPost.map(
                post => {
                  return (
                    <>
                      <PostCard

                        title={post.title}
                        description={post.description}
                        buttonsSection={"d-none"}
                        buttonLikeSection={"d-flex justify-content-end"}
                        emitLikeButton={() => likeUnlikePost(post._id)}
                        numberOflikes={post.numberOfLikes.length}
                        userName={post.userId.email}
                        datePost={new Date(post.createdAt).toDateString()}

                      />
                    </>
                  )
                }
              )}
            </div>)
            : ("No tienes posts de seguidos")

          }
        </div>)



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
    </>

  )
};
