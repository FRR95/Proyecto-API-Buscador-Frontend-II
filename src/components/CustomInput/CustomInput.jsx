
import "./CustomInput.css"

export const CustomInput = ({ type, name, value, changeEmit, design, placeholder }) => {

    return (

        <input
            placeholder={placeholder}
            className={design}
            type={type}
            name={name}
            value={value}
            onChange={(e) => changeEmit(e)}
        />
    )
}