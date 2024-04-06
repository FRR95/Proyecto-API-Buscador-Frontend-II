import { useNavigate } from "react-router-dom";
import "./Profile.css"
import { updatePostDetail } from "../../app/slices/postDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { CreatePost, GetProfile, GetUserPosts, UpdateProfile, deleteMyPost, updateMyPost } from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PostCard } from "../../components/PostCard/PostCard";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdxUser = useSelector(userData)

  const [loadedData, setLoadedData] = useState(false);
  const [editboolean, setEditBoolean] = useState(false);




  const [user, setUser] = useState({
    following:"",
    followers:"",
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
    _id:"",
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
        following:fetched.data.following,
        followers:fetched.data.followers,
        name: fetched.data.name,
        email: fetched.data.email,
      });
 

    } catch (error) {
      console.log(error);
    }
  };

  const changeboolean = () => {
    setEditBoolean(true)
  }

  const editProfile = async () => {
    const fetched = await UpdateProfile(rdxUser.credentials.token, user)
    if (!fetched.success) {
      console.log(fetched.message)
    }

    console.log(fetched)

    setTimeout(() => {
      getUserProfile()
      setEditBoolean(false)
    }, 500);

  }

  const createPost = async () => {
    const fetched = await CreatePost(rdxUser.credentials.token, postCredentials)
    if (!fetched.success) {
      console.log(fetched.message)
    }
    console.log(fetched.message)

    setPostCredentials({
      title: "",
      email: "",
    });

    BringPosts()
  }

  const deletePost = async (postId) => {
    const fetched = await deleteMyPost(postId, rdxUser.credentials.token)
    if (!fetched.success) {
      console.log(fetched.message);
    }
    console.log(fetched.message);
    BringPosts()

  }

  const updatePost = async (postId) => {
    const fetched = await updateMyPost(postId,postCredentials, rdxUser.credentials.token)
    if (!fetched.success){
      console.log(fetched.message)
    }

    console.log(fetched.message)
    BringPosts()

    setPostCredentials({
      _id:"",
      title: "",
      description: ""
    })
  }

  const AddInfoToForm = async (post) => {
    setPostCredentials({
      _id:post._id,
      title: post.title,
      description: post.description
    })

    console.log(postCredentials)
  }

  

  useEffect(() => {

    if (!loadedData) {
      getUserProfile();
    }

  }, [user])


  const manageDetail = (post) => {
    //1. guardamos en RDX
   const dispatched= dispatch(updatePostDetail({ post }));
    console.log(dispatched)
    //2. navegamos a la vista de detalle
    navigate("/postdetail");
  };

  return (
    <>
      <div className="d-flex justify-content-center row  align-items-center profileDesign">

        {editboolean
          ? (
            <div className="d-flex justify-content-center flex-column  align-items-center">
              <CustomInput
                type="text"
                name="name"
                value={user.name || ""}
                changeEmit={inputHandler}
              />
              <CustomButton
                onClick={editProfile}
                design={""}
                title={`Editar ${user.name}`} />
            </div>)
          : (

            <div className="d-flex justify-content-center row  align-items-center">
              <ProfileCard
                idUser={"idUser"}
                key={"key"}
                username={user.name}
                email={user.email}
                buttonSectionDesign={"d-flex row justify-content-center align-items-center"}

                buttonDeleteSection={"d-none col justify-content-center align-items-center"}
                buttonEditSection={"d-flex col justify-content-center align-items-center"}
                buttonEditTitle={`Editar ${user.name}`}
                buttonDeleteTitle={`Editar ${user.name}`}
                buttonEditDesign={"buttonEditDesign"}

                followFollowingSection={"d-flex row justify-content-center align-items-center"}
                buttonFollowerSection={"d-flex col justify-content-center align-items-center"}
                numberOfFollowers={user.followers.length}
                buttonFollowingSection={"d-flex col justify-content-center align-items-center"}
                numberOfFollowing={user.following.length}
                emitEditButton={changeboolean}


              />
            </div>)

        }

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
            <CustomButton
              onClick={()=>updatePost(postCredentials._id)}
              design={"m-1"}
              title={`Edit Post`}
              icon={"bi bi-pen-fill"}
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
                          emitDeleteButton={() => deletePost(post._id)}
                          emitEditButton={() => AddInfoToForm(post)}
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

    </>)
}