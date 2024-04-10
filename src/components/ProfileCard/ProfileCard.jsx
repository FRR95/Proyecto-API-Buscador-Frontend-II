import { CustomButton } from "../CustomButton/CustomButton"
import "./ProfileCard.css"

export const ProfileCard = ({ buttonEditDesign, buttonEditTitle, buttonDeleteDesign, buttonDeleteTitle, username, email, buttonSectionDesign, buttonEditSection, buttonDeleteSection, emitDeleteButton, emitEditButton, followFollowingSection, buttonFollowerSection, numberOfFollowers, buttonFollowingSection, numberOfFollowing, buttonDetailSection, emitDetailButton, buttonDetailDesign, buttonDetailTitle }) => {

    return (
        <div className="d-flex row m-5 justify-content-center align-items-center profileCardDesign">



            <div className="d-flex row justify-content-center align-items-center" >
                {username}
            </div>

            <div className="d-flex row justify-content-center align-items-center" >
                {email}
            </div>
            <div className={followFollowingSection} >
                <div className={buttonFollowerSection}>

                    <h5>Seguidores: {numberOfFollowers}</h5>


                </div>
                <div className={buttonFollowingSection}>
                    <h5>Siguiendo: {numberOfFollowing}</h5>

                </div>
            </div>

            {/* Button section */}
            <div className={buttonSectionDesign} >
                <div className={buttonEditSection}>
                    <button onClick={emitEditButton} className="buttonEditDesign" data-bs-toggle="modal" data-bs-target="#exampleModalProfile">
                        <i className="bi bi-pen-fill"></i>    {buttonEditTitle}
                    </button>

                </div>
                <div className={buttonDeleteSection}>
                    <button onClick={emitDeleteButton} className="buttonDeleteDesign">
                        <i className="bi bi-trash3"></i>    {buttonDeleteTitle}
                    </button>
                </div>
                <div className={buttonDetailSection}>
                    <button onClick={emitDetailButton} className="buttonDetailDesign">
                        <i className="bi bi-eye-fill"></i>    {buttonDetailTitle}
                    </button>
                </div>
            </div>



        </div>
    )

}