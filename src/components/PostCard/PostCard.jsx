import "./PostCard.css"

export const PostCard = ({ datePost, userName, title, description,buttonsSection,buttonEditSection,emitEditButton,buttonEditDesign,buttonEditTitle,buttonDetailSection,emitDetailButton,buttonDetailDesign,buttonDetailTitle,buttonDeleteSection,emitDeleteButton,buttonDeleteDesign,buttonDeleteTitle }) => {
    return (
        <div className="d-flex row justify-content-center align-items-center postCardDesign">
            <div className="d-flex row justify-content-center align-items-center">
                <h5 className="d-flex row justify-content-start align-items-center">{userName}</h5>
                <h5 className="d-flex row justify-content-start align-items-center">{title}</h5>
                <p className="d-flex row justify-content-start align-items-center">{description} </p>
                <p className="d-flex row justify-content-end align-items-center">{datePost} </p>
            </div>

            <div className={buttonsSection} >
                <div className={buttonEditSection}>
                    <button onClick={emitEditButton} className={buttonEditDesign}>
                        {buttonEditTitle}
                    </button>

                </div>
                <div className={buttonDetailSection}>
                    <button onClick={emitDetailButton} className={buttonDetailDesign}>
                        {buttonDetailTitle}
                    </button>
                </div>
                <div className={buttonDeleteSection}>
                    <button onClick={emitDeleteButton} className={buttonDeleteDesign}>
                        {buttonDeleteTitle}
                    </button>
                </div>
            </div>
        </div>)

}