import { useNavigate } from "react-router-dom";
import "./Profile.css"
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { GetProfile } from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";

export const Profile = () => {
  const navigate = useNavigate();

  const [loadedData, setLoadedData] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const rdxUser = useSelector(userData)

  useEffect(() => {
    console.log(`fdfssfasd ${rdxUser.credentials.token}`);
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

  useEffect(() => {

    const getUserProfile = async () => {
      try {
        const fetched = await GetProfile(rdxUser.credentials.token);
        setLoadedData(true);
        console.log(fetched)

        setUser({
          name: fetched.data.name,
          email: fetched.data.email,
        });

      } catch (error) {
        console.log(error);
      }
    };

    if (!loadedData) {
      getUserProfile();
    }

  }, [user])




  return (
    <div className="d-flex justify-content-center row  align-items-center profileDesign">
      <div className="d-flex justify-content-center row  align-items-center">
        <ProfileCard
          idUser={"idUser"}
          key={"key"}
          password={"password"}
          username={user.name}
          email={user.email}
          buttonEditTitle={"buttonEditTitle"}
          buttonDeleteTitle={"buttonDeleteTitle"}
          buttonEditDesign={"buttonEditDesign"}
          buttonDeleteDesign={"buttonEditDesign"}

        />
      </div>
      <div className="d-flex justify-content-center row  align-items-center">
        <CustomInput
          design={"input-design-big"}

        />
      </div>

    </div>
  )
}