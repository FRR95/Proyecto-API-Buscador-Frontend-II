import "./PostDetail.css"
import { useSelector } from "react-redux";
import { postDetailData } from "../../app/slices/postDetailSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostDetailCard } from "../../components/PostDetailCard/PostDetailCard";


export const PostDetail =()=>{
    const detailRdx = useSelector(postDetailData);
    const navigate = useNavigate();


    useEffect(() => {
        if (!detailRdx?.post?._id) {
          navigate("/");
        }
      }, [detailRdx]);
    return(
        <div className="d-flex justify-content-center align-items-center postDetailDesign">{
            detailRdx?.post?._id
            && 
           <PostDetailCard
           title={detailRdx?.post.title}
           description={detailRdx?.post.description}
           datePost={detailRdx?.post.createdAt}
           dateUpdatedPost={detailRdx?.post.updatedAt}
           IdPost={detailRdx?.post._id}
           numberOflIkes={detailRdx?.post.numberOfLikes.length}
           
           />
            
            }</div>
    )
}