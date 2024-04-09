
import "./ProfileDetail.css"

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileDetailCard } from "../../components/ProfileDetailCard/ProfileDetailCard";
import { profileDetailData } from "../../app/slices/profileDetailSlice";
import { userData } from "../../app/slices/userSlice";
import { FollowUnfollowUserService } from "../../services/apiCalls";
import { ToastContainer, toast } from 'react-toastify';

export const ProfileDetail = () => {
    const detailRdx = useSelector(profileDetailData);
    const rdxUser = useSelector(userData)
    const navigate = useNavigate();

    useEffect(() => {
        if (!detailRdx?.user?._id) {
            navigate("/");
        }
    }, [detailRdx]);

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    const FollowUnfollowUser = async (userId) => {
        try {
            const fetched = await FollowUnfollowUserService(userId, rdxUser.credentials.token)
            if (!fetched.success) {
                toast.error(`${fetched.message}`)
            }
            toast(`🙍‍♂️ ${fetched.message}`)
        } catch (error) {

        }

    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center profileDetailDesign">
                {
                    detailRdx?.user?._id
                    &&
                    <ProfileDetailCard
                        username={detailRdx?.user.name}
                        email={detailRdx?.user.email}
                        createdAt={detailRdx?.user.createdAt}
                        numberOfFollowers={detailRdx?.user.followers.length}
                        numberOfFollowing={detailRdx?.user.following.length}
                        buttonFollowUnfollowEmit={() => FollowUnfollowUser(detailRdx?.user?._id)}
                        buttonFollowUnfollowDesign={""}
                        buttonFollowUnfollowTitle={`Seguir a ${detailRdx?.user.name}`}
                    />
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

        </>
    )
}