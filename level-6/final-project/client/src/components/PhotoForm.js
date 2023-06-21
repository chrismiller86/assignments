import React, {useState} from "react"


const initInputs = {
    title: "",
    gear: "",
    imgUrl: "",
    
}

export default function PhotoForm(props){
    const [inputs, setInputs] = useState(initInputs)
    const {addPhoto} = props

function handleChange(e){
    const {name, value} = e.target
    setInputs (prevInputs => ({
        ...prevInputs, 
        [name]: value
    }))
}

function handleSubmit(e){
    e.preventDefault()
    addPhoto(inputs)
    setInputs(initInputs)
}

const {title, imgUrl, gear} = inputs

return(
    <form onSubmit={handleSubmit}>
        <input
        type = "text"
        name = "title"
        value = {title}
        onChange = {handleChange}
        placeholder= "Title"
        />
        <input
        type = "text"
        name = "imgUrl"
        value = {imgUrl}
        onChange = {handleChange}
        placeholder = "Image Url"
        />
        <input
        type = "text"
        name = "gear"
        value = {gear}
        onChange = {handleChange}
        placeholder = "Carmera used"

        />
        <button>Add Photo</button>

    </form>
)

}