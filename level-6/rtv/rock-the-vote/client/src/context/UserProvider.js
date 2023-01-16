import React, { useState } from "react"
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

    const initCommentState = {
        comments: [],
        errMsg: ""
    }



    const [userState, setUserState] = useState(initState)
    const [commentState, setCommentState] = useState(initCommentState)


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

    function getComments() {
        userAxios.get('/api/comments')
            .then(res => {
                setCommentState(prevCommentState => ({
                    ...prevCommentState,
                    comments: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
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
                getComments


            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}