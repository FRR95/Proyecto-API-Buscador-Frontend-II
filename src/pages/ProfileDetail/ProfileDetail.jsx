
import "./ProfileDetail.css"

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileDetailCard } from "../../components/ProfileDetailCard/ProfileDetailCard";
import { profileDetailData } from "../../app/slices/profileDetailSlice";

export const ProfileDetail = () => {
    const detailRdx = useSelector(profileDetailData);
    const navigate = useNavigate();

    useEffect(() => {
        if (!detailRdx?.user?._id) {
            navigate("/");
        }
    }, [detailRdx]);



    return (
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
                // buttonFollowUnfollowEmit={detailRdx?.user.name}
                buttonFollowUnfollowDesign={""}
                buttonFollowUnfollowTitle={`Seguir a ${detailRdx?.user.name}`}
                />
            }

        </div>
    )
}