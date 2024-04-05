import { useNavigate } from "react-router-dom";
import "./Profile.css"
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { CreatePost, GetProfile, GetUserPosts, UpdateProfile } from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PostCard } from "../../components/PostCard/PostCard";

export const Profile = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData)

  const [loadedData, setLoadedData] = useState(false);
  const [editboolean, setEditBoolean] = useState(false);




  const [user, setUser] = useState({
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
      console.log(fetched)




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

  useEffect(() => {

    if (!loadedData) {
      getUserProfile();
    }

  }, [user])




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
          <div className="d-flex justify-content-center flex-column  align-items-center">
            <CustomButton
              onClick={createPost}
              design={""}
              title={`Post`}
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

                      <div className="d-flex mt-5 justify-content-center row   align-items-center">
                     <PostCard
                     buttonsSection={"d-none"}
                   
                     userName={post.title}
                     title={post.title}
                     description={post.description}
                     datePost={post.createdAt}
                     />
                      </div>

                    </>
                  )
                }
              )
              }
            </div>)
          : (<p>No tienes posts</p>)
        }

      </div>

    </>)
}