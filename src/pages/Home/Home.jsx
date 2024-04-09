import { useEffect, useState } from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { LikeDislikePost, getTimeline } from "../../services/apiCalls";
import { PostCard } from "../../components/PostCard/PostCard";

import { ToastContainer, toast } from 'react-toastify';

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
    if(rdxUser?.credentials.token){
    if (followingPost.length === 0) {
      BringTimelinePosts()
    }
  }

  }, [followingPost])



  const likeUnlikePost =async(postId)=>{
    
    try {
      const fetched =await LikeDislikePost(postId,rdxUser.credentials.token)
    
      if(!fetched.success){
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
        ? (<div className="  d-flex  justify-content-center align-items-center home-design">No estas logueado</div>)
        : (<div className=" d-flex  justify-content-center align-items-center home-design">
          {followingPost.length > 0
          ?(<div>
            {followingPost.map(
              post =>{
                return(
                  <>
                  <PostCard
                  
                  title={post.title}
                  description={post.description}
                  buttonsSection={"d-none"}
                  buttonLikeSection={"d-flex justify-content-end"}
                  emitLikeButton={() => likeUnlikePost(post._id)}
                  numberOflikes={post.numberOfLikes.length}
                  // userName={post.userId.email}
               
                  />
                  </>
                )
              }
            )}
          </div>)
          :("No tienes posts de seguidos")
          
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
