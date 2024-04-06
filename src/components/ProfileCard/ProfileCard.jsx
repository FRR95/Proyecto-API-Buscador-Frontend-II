import { CustomButton } from "../CustomButton/CustomButton"
import "./ProfileCard.css"

export const ProfileCard = ({ buttonEditDesign, buttonEditTitle, buttonDeleteDesign, buttonDeleteTitle, username, email,buttonSectionDesign,buttonEditSection,buttonDeleteSection,emitDeleteButton,emitEditButton,usernameTest }) => {

    return (
        <div className="d-flex row m-5 justify-content-center align-items-center profileCardDesign">

          
         
            <div className="d-flex row justify-content-center align-items-center" >
                {username}
            </div>
         
            <div className="d-flex row justify-content-center align-items-center" >
                {email}
            </div>
            <div className={buttonSectionDesign} >
                <div className={buttonEditSection}>
                    <button onClick={emitEditButton} className={buttonEditDesign}>
                    <i className="bi bi-pen-fill"></i>    {buttonEditTitle}
                    </button>

                </div>
                <div className={buttonDeleteSection}>
                    <button onClick={emitDeleteButton} className={buttonDeleteDesign}>
                        {buttonDeleteTitle}
                    </button>
                </div>
            </div>


           
        </div>
    )

}