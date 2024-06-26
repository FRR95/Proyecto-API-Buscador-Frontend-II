import "./PostCard.css"

export const PostCard = ({ datePost, userName, title, description, buttonsSection, buttonEditSection, emitEditButton, buttonEditDesign, buttonEditTitle, buttonDetailSection, emitDetailButton, buttonDetailDesign, buttonDetailTitle, buttonDeleteSection, emitDeleteButton, buttonDeleteDesign, buttonDeleteTitle, buttonLikeSection, numberOflikes, emitLikeButton, buttonLikeDesign,onClickUserName, key }) => {
    return (
        <div key={key} className="d-flex row m-5 justify-content-center align-items-center postCardDesign">
            <div className="d-flex row justify-content-center align-items-center">

                <div  className="d-flex row justify-content-start align-items-center" ><img src="https://navchetnanirmanfoundation.in/img/User-Profile-PNG-Image.png" className="imgProfileSm"    alt="img-profile"/></div>
                
                <h5 onClick={onClickUserName} className="d-flex row justify-content-start align-items-center usernameHover">{userName}</h5>
                <h5 className="d-flex row justify-content-start align-items-center">{title}</h5>
                <p className="d-flex row justify-content-start align-items-center">{description} </p>
                <p className="d-flex row justify-content-end align-items-center">{datePost} </p>
            </div>

            <div className={buttonsSection} >
                <div className={buttonEditSection}>
                    <button onClick={emitEditButton} className="buttonEditDesign" data-bs-toggle="modal" data-bs-target="#exampleModalPost">
                        <i className="bi bi-pen-fill"></i>   {buttonEditTitle}
                    </button>

                </div>
                <div className={buttonDetailSection}>
                    <button onClick={emitDetailButton} className="buttonDetailDesign">
                        <i className="bi bi-eye"></i>  {buttonDetailTitle}
                    </button>
                </div>
                <div className={buttonDeleteSection}>
                    <button onClick={emitDeleteButton} className="buttonDeleteDesign">
                        <i className="bi bi-trash3"></i>   {buttonDeleteTitle}
                    </button>
                </div>
            </div>
            <div className={buttonLikeSection}>
                <button onClick={emitLikeButton} className="buttonLikeDesign">
                    <i className="bi bi-heart-fill"></i> {numberOflikes}
                </button>
            </div>
        </div>)

}