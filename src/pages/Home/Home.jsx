import { useEffect, useState } from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { getTimeline } from "../../services/apiCalls";
import { PostCard } from "../../components/PostCard/PostCard";
export const Home = () => {
  //Instancia de Redux en modo lectura para home

  const rdxUser = useSelector(userData)

  const [followingPost, setFollowingPost] = useState([])

  useEffect(() => {
   
  }, [rdxUser])

  const BringTimelinePosts = async () => {
    try {


      const fetched = await getTimeline(rdxUser.credentials.token)
      setFollowingPost(fetched.data)
      console.log(fetched)
   

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if(rdxUser?.credentials.token){
    if (followingPost.length === 0) {
      BringTimelinePosts()
    }
  }

  }, [followingPost])







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

    </>

  )
};
