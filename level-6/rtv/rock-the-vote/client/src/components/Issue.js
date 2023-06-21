import React, { useContext, useState, useEffect} from "react";
import { UserContext, userAxios } from "../context/UserProvider";
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'

export default function Issue(props) {
    const { title, description, imgUrl, _id, likedBy, dislikedBy} = props
    const { deleteIssue, addComment, likeIssue, dislikeIssue} = useContext(UserContext)

    const likeTotal = likedBy.length - dislikedBy.length

  
 const [comments, setComments] = useState([])





    function getCommentsByIssueId(_id) {
        userAxios.get(`/api/comments/${_id}`)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(() => {
        getCommentsByIssueId(_id)
    }, [])

  
    return (
        <div className="issue">
            <h1>{title}</h1>
            <h3>{description}</h3>
            <img src={imgUrl} alt="issue image" width={300} />
            <br />
            <button onClick={() => deleteIssue(_id)}>Delete</button>
            <br />
            <p>Votes: {likeTotal}</p>
            <button onClick={() => likeIssue(_id)}>like</button>           
            <button onClick={() => dislikeIssue(_id)}>Dislike</button>
            <CommentForm addComment={addComment} issueId={_id} />
            <br />
            Comments
            <br />
            <CommentList comments={comments} />


        </div>
    )
}


