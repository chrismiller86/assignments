import React from 'react'
import { UserContext, userAxios } from "../context/UserProvider";





export default function Like(props) {
    const { _id, likedBy, dislikedBy } = props


    // const likeTotal = likedBy.length - dislikedBy.length


    function likeIssue(_id){
        userAxios.put(`/api/issue/like/${_id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data.errMsg))
       // getUserIssues()
    }

    function dislikeIssue(_id){
        userAxios.put(`/api/issue/dislike/${_id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data.errMsg))
        //getUserIssues()
    }

    return (
        <div>
        {/* <p>Votes: {likeTotal}</p> */}
        <button onClick={() => likeIssue(_id)}>Upvote</button>

        <button onClick={() => dislikeIssue(_id)}>Downvote</button>
    
    </div>
    )
}