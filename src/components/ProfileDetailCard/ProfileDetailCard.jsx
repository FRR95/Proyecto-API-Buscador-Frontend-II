import "./ProfileDetailCard.css"

export const ProfileDetailCard =({username,email,createdAt,numberOfFollowers,numberOfFollowing,buttonFollowUnfollowEmit,buttonFollowUnfollowDesign,buttonFollowUnfollowTitle})=>{
    return(
        <div className="d-flex row m-5 justify-content-center align-items-center profileDetailCardDesign">
            
            <div className="d-flex row justify-content-center align-items-center" >
                {username}
            </div>

            <div className="d-flex row justify-content-center align-items-center" >
                {email}
            </div>
            <div className="d-flex row justify-content-center align-items-center" >
                {createdAt}
            </div>
            <div className="d-flex col justify-content-center align-items-center" >
                <div className="d-flex col justify-content-center align-items-center">

                    <h5>Seguidores: {numberOfFollowers}</h5>


                </div>
                <div className="d-flex col justify-content-center align-items-center">
                    <h5>Siguiendo: {numberOfFollowing}</h5>

                </div>
            </div>

            <div className={"d-flex row justify-content-center align-items-center"}>
                <button onClick={buttonFollowUnfollowEmit} className={buttonFollowUnfollowDesign} >
                <i class="bi bi-person-fill"></i> {buttonFollowUnfollowTitle} 
                </button>
            </div>
        </div>
    )
}