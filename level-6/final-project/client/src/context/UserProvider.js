import React, {useState} from "react"
import axios from "axios"

export const UserContext = React.createContext()

export const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        photos: [],
        errMsg: ""
    }

const [userState, setUserState] = useState(initState)

function signup(credentials){
    axios.post("/auth/signup", credentials)
    .then(res => {
        const {user, token} = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
            ...prevUserState, 
            user, 
            token
        }))
    })
    .catch(err => handleAuthErr(err.response.data.errMsg))
}

function login(credentials){
    axios.post("/auth/login", credentials)
    .then(res => {
        const {user, token} = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
            ...prevUserState,
            user, 
            token
        }))
    })
    .catch(err => handleAuthErr(err.response.data.errMsg))
}

function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
        user: {},
        token: "",
        photos: []
    })
}

function handleAuthErr(errMsg){
    setUserState(prevState => ({
        ...prevState, 
        errMsg
    }))
}

function resetAuthErr(){
    setUserState(prevState => ({
        ...prevState,
        errMsg: ""
    }))
}

function getUserPhotos(){
    userAxios.get("/api/photo/user")
    .then(res => {
        setUserState(prevState => ({
            ...prevState,
            photos: res.data
        }))
    })
    .catch(err => console.log(err.response.data.errMsg))
}

function getPhotos(){
    userAxios.get("/api/photo")
    .then(res => {
        setUserState(prevState => ({
            ...prevState,
            photos: res.data
        }))
    })
    .catch(err => console.log(err.response.data.errMsg))
}

function addPhoto(newPhoto){
    userAxios.post("/api/photo", newPhoto)
    .then(res => {
        setUserState(prevState => ({
            ...prevState, 
            photos: [...prevState.photos, res.data]
        }))
    })

    .catch(err => console.log(err.response.data.errMsg))
}

function deletePhoto(photoId){
    userAxios.delete(`/api/photo/${photoId}`)
    .then(res => {
        setUserState(prevState => ({
            ...prevState,
            photos: prevState.photos.filter(photo => photo._id !== photoId)
        }))
    })
    .catch(err => console.log(err.response.data.errMsg))
}

return(
    <UserContext.Provider
    value={{
        ...userState,
        userAxios,
        signup, 
        login,
        logout,
        addPhoto,
        resetAuthErr,
        getUserPhotos,
        getPhotos, 
        deletePhoto
    }}
    >
        {props.children}
        </UserContext.Provider>
)


}