import "./CustomButton.css"
export const CustomButton =({onClick,design,title})=>{
    return(
<button className={design} onClick={onClick}>{title}</button>
    )
}