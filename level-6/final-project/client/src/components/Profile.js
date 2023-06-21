import React, {useContext, useEffect} from "react"
import PhotoForm from "./PhotoForm.js"
import PhotoList from "./PhotoList.js"
import {UserContext} from "../context/UserProvider.js"

export default function Profile(){
    const {
        user: {
            username
        },
        addPhoto,
        photos,
        getUserPhotos
        } = useContext(UserContext)

        useEffect(() => {
            getUserPhotos()
        },[])
     

    return(
        <div className="profile">
            <h1>Welcome {username}</h1>
            <h3>Add a photo</h3>
            <PhotoForm addPhoto={addPhoto}/>
            <h3>Your Gallery</h3>
            <PhotoList photos={photos}/>

                   
        </div>
    )




}