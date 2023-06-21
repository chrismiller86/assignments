import React, { useState} from "react"
import {useNavigate} from 'react-router-dom'
import axios from "axios"

export const UserContext = React.createContext()

export const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [commentState, setCommentState] = useState([])
    // const [refresh,setRefresh] = useState(false);


        const navigate = useNavigate()

      


    function signup(credentials) {
        axios.post("/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
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

    function login(credentials) {
        axios.post("/auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
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

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            issues: []
        })
    }

    function handleAuthErr(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    function getUserIssues() {
        userAxios.get("/api/issue/user")
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }


    //Get all
    function getIssues() {
        userAxios.get('/api/issue')
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }



    // add issue 
    function addIssue(newIssue) {
        userAxios.post("/api/issue", newIssue)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteIssue(issueId) {
        console.log(issueId)
        userAxios.delete(`/api/issue/${issueId}`)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    issues: prevState.issues.filter(issue => issue._id !== issueId)
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addComment(issueId, newComment) {
        userAxios.post(`/api/comments/${issueId}`, newComment)
            .then(res => {
                getIssues()
                setCommentState(prevState => ({
                    ...prevState,
                    comments: [prevState.comments, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getComments(issueId) {
        userAxios.get(`/api/comments/${issueId}`)
            .then(res => {
                setCommentState(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // function handleRefresh(){
    //     setRefresh((prev)=>!prev)

    // }

    function likeIssue(issueId){
        userAxios.put(`/api/issue/like/${issueId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data.errMsg))
        //handleRefresh()
        navigate("/public")
        navigate("/profile")
        navigate("/public")
        getIssues()
     


    }

    function dislikeIssue(issueId){
        userAxios.put(`/api/issue/dislike/${issueId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data.errMsg))
        navigate("/public")
        navigate("/profile")
        navigate("/public")
        getIssues()

        



    }
    



    return (
        <UserContext.Provider
            value={{
                ...userState,
                ...commentState,
                userAxios,
                signup,
                login,
                logout,
                addIssue,
                resetAuthErr,
                getUserIssues,
                getIssues,
                deleteIssue,
                addComment,
                getComments,
                likeIssue, 
                dislikeIssue
               


            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}