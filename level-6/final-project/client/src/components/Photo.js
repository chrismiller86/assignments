import React, {useContext, useState, useEffect} from "react"
import {UserContext, userAxios} from "../context/UserProvider"

export default function Photo(props){
    const {title, imgUrl, gear, _id, user} = props
    const {deletePhoto} = useContext(UserContext)

return(
    <div className="photo">
        <h1>"{title}"</h1>
        <img src={imgUrl} alt="photo" width={300}/>
        <h3>Shot with: {gear}</h3>
        <br/>
        <button onClick={()=> deletePhoto(_id)}>Delete</button>
        <br/>
        
    </div>
)

}