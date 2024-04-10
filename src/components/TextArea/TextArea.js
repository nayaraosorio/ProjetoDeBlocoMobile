



const TextArea = (props) => {
    const placeholderText =  `${props.placeholder}...`

    const onChangeHandler = (event) => {
        props.onChange(event.target.value);
    }

    return(
        <div className="TextArea">
            <label>{props.label}</label>
            <input value={props.valueKey} onChange={onChangeHandler} required={props.valueRequired} placeholder={placeholderText}/>
        </div>
    )
}