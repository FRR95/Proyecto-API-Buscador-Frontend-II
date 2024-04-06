import "./PostDetailCard.css"

export const PostDetailCard = ({ datePost, userName, title, description,dateUpdatedPost,IdPost,numberOflIkes,key }) => {
    return (
        <div key={key} className="d-flex row m-5 justify-content-center align-items-center postDetailCardDesign">
            <div className="d-flex row justify-content-center align-items-center">
                <h5 className="d-flex row justify-content-start align-items-center">{userName}</h5>
                <h5 className="d-flex row justify-content-start align-items-center">{title}</h5>
                <p className="d-flex row justify-content-start align-items-center">{description} </p>
                <p className="d-flex row justify-content-end align-items-center">{datePost} </p>
                <p className="d-flex row justify-content-end align-items-center">{dateUpdatedPost} </p>
                <p className="d-flex row justify-content-end align-items-center">{IdPost} </p>
                <p className="d-flex row justify-content-end align-items-center"><i className=" d-flex row justify-content-end align-items-center bi bi-heart-fill"></i>{numberOflIkes} </p>
            </div>

        </div>)

}