import "./CustomButton.css"
export const CustomButton = ({ onClick, design, title,icon }) => {
    return (
        <button className={design} onClick={onClick}>
           <i className={icon}></i> {title}
        </button>
    )
}