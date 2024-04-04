import "./ProfileCard.css"

export const ProfileCard = ({ buttonEditDesign, buttonEditTitle, buttonDeleteDesign, buttonDeleteTitle, username, email, idUser, password }) => {

    return (
        <div className="d-flex row justify-content-center align-items-center profileCardDesign">

            <div className="d-flex row justify-content-center align-items-center" >
                {idUser}
            </div>
            <div className="d-flex row justify-content-center align-items-center" >
                {password}
            </div>


            <div className="d-flex row justify-content-center align-items-center" >
                {username}
            </div>
            <div className="d-flex row justify-content-center align-items-center" >
                {email}
            </div>
            <div className="d-flex row justify-content-center align-items-center" >
                <div className="d-flex col justify-content-center align-items-center">
                    <button className={buttonEditDesign}>
                        {buttonEditTitle}
                    </button>

                </div>
                <div className="d-flex col justify-content-center align-items-center">
                    <button className={buttonDeleteDesign}>
                        {buttonDeleteTitle}
                    </button>
                </div>
            </div>
        </div>
    )

}