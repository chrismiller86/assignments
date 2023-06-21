import React, {useContext, useEffect} from "react";
import Photo from "./Photo.js"
// import {UserContext} from "../context/UserProvider.js"

export default function PhotoList(props){
    const {photos} = props
    // const {getPhotos} = useContext(UserContext)

    // useEffect(() => {getPhotos()}, [])

    return(
        <div>
            {photos.map(photo => <Photo {...photo} key={photo._id} />)}
        </div>
    )
}