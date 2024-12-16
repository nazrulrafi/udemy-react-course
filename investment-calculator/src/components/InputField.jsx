export default function InputField({label, value, onChangeHandle, valTitle, min="0"}) {
    return (
        <p>
            <label>{label}</label>
            <input
                type="number"
                required={true}
                value={value}
                onChange={(e)=>onChangeHandle(valTitle,e.target.value)}
                min={min}
            />
        </p>
    )
}