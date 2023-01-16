import React, { useContext, useState, useEffect } from "react";
import { UserContext, userAxios } from "../context/UserProvider";
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'


export default function Issue(props) {
    const { title, description, imgUrl, _id, user } = props
    const { deleteIssue, addComment, comments } = useContext(UserContext)


    // function getCommentsByIssueId(_id) {
    //     userAxios.get(`/api/comments/${_id}`)
    //         .then(res => {
    //             setComments(res.data)
    //         })
    //         .catch(err => console.log(err.response.data.errMsg))
    // }

    // useEffect(() => {
    //     getCommentsByIssueId(_id)
    // }, [])

    return (
        <div className="issue">
            <h1>{title}</h1>
            <h3>{description}</h3>
            <img src={imgUrl} alt="issue image" width={300} />
            <br />
            <button onClick={() => deleteIssue(_id)}>Delete</button>
            <br />
            <br />
            Comments
            <br />
            <CommentForm addComment={addComment} issueId={_id} />
            <CommentList comments={comments} />


        </div>
    )
}


