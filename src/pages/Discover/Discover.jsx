import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice"
import { useSelector, useDispatch } from "react-redux";
import "./Discover.css"
import { useEffect, useState } from "react";
import { deleteMyPost, getPosts } from "../../services/apiCalls";
import { PostCard } from "../../components/PostCard/PostCard";
import { updatePostDetail } from "../../app/slices/postDetailSlice";

export const Discover = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const rdxUser = useSelector(userData)
    const [posts, setPosts] = useState([])

    console.log(rdxUser.credentials.user.roleName)


    useEffect(() => {
        if (!rdxUser.credentials.token) {
          navigate("/")
        }
      }, [rdxUser])

      const BringPosts = async () => {
        try {
    
    
          const fetched = await getPosts(rdxUser.credentials.token)
          setPosts(fetched.data)
          console.log(fetched)
       
    
        } catch (error) {
          console.log(error)
        }
    
      }

      useEffect(() => {
        if(rdxUser?.credentials.token){
        if (posts.length === 0) {
          BringPosts()
        }
      }
    
      }, [posts])
    

 

// CRUD POSTS

const DeletePost = async (postId) => {
    const fetched = await deleteMyPost(postId, rdxUser.credentials.token)
    if (!fetched.success) {
      console.log(fetched.message);
    }
    console.log(fetched.message);
    BringPosts()

  }

  const manageDetail = (post) => {
    //1. guardamos en RDX
   const dispatched= dispatch(updatePostDetail({ post }));
    console.log(dispatched)
    //2. navegamos a la vista de detalle
    navigate("/postdetail");
  };


    return (
        <div className="d-flex  justify-content-center align-items-center discoverPageDesign">
            
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
                          buttonsSection={rdxUser?.credentials?.user?.roleName === "admin" ?("d-flex justify-content-start"):("d-none")}
                          buttonLikeSection={"d-flex justify-content-end"}
                          buttonDeleteSection={"d-flex justify-content-center m-1   align-items-center"}
                          buttonDeleteTitle={"Borrar post"}
                          buttonEditSection={"d-flex justify-content-center m-1   align-items-center"}
                          buttonEditTitle={"Editar post"}
                          buttonDetailSection={"d-flex justify-content-center m-1  align-items-center"}
                          buttonDetailTitle={"Ver post"}
                          title={post.title}
                          description={post.description}
                          datePost={post.createdAt}
                          numberOflikes={post.numberOfLikes.length}
                          emitDeleteButton={()=>DeletePost(post._id)}
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
        </div>
    )
}