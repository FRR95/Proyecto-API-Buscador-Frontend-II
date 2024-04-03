import "./CustomLink.css"
import { useNavigate } from "react-router-dom"

export const CustomLink = ({path, title}) => {

    const navigate = useNavigate()

    return (
        <div className="clink-design" onClick={()=>navigate(path)}>{title}</div>
    )
}