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
            <>
           <PostDetailCard
           title={`Titulo: ${detailRdx?.post.title}`}
           description={`Descripción: ${detailRdx?.post.description}`}
           datePost={`Fecha de creación: ${new Date(detailRdx?.post.createdAt).toDateString()}`}
           dateUpdatedPost={`Fecha de modificación: ${new Date(detailRdx?.post.updatedAt).toDateString()}`}
           IdPost={`Id del post: ${detailRdx?.post._id}`}
           numberOflIkes={`${detailRdx?.post.numberOfLikes.length}`}
           userOwner={`Propietario del post: ${detailRdx?.post.userId.name}`}
           />
            </>
            }</div>
    )
}