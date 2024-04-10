import TextArea from "..TextArea/TextArea";

const { useState } = require("react")



const SubscribeForm = (props) => {

    const [name, setName ] = useState('')
    const [age, setAge] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [password, setPassword] = useState('')
    



    const saveForm = (event) => {
        event.preventDefault()

        props.userSubscribed({name, age, country, email, image, password})

        setName('')
        setAge('')
        setCountry('')
        setImage('')
        setEmail('')
        setPassword('')
        
    }

    return(
        <>
       
        </>
    )

};

export default SubscribeForm;

