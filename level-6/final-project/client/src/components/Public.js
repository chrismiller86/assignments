import React, {useContext, useEffect} from "react"
import PhotoList from "./PhotoList.js"
import {UserContext} from "../context/UserProvider.js"

export default function Public(){
    const {photos, getPhotos} = useContext(UserContext)

    useEffect(() => {getPhotos()}, [])

return (
    <div className="public">
        <h1>Gallery</h1>
        <PhotoList photos = {photos}/>
    </div>
)

}