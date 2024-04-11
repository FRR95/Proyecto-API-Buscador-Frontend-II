import "./TextArea.css"

export const TextArea = ({ type, name, value, changeEmit, design, placeholder,onBlurFunction }) => {

    return (

        <textarea
            placeholder={placeholder}
            className={design}
            type={type}
            name={name}
            value={value}
            onChange={(e) => changeEmit(e)}
            onBlur={onBlurFunction}
        />
    )
}