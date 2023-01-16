import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import Comment from "./Comment.js"

export default function CommentList(props) {
    const { comments } = props
    const { getComments } = useContext(UserContext)

    useEffect(() => { getComments() }, [])


    return (
        <div className='commentList'>
            {comments.map(comment => <Comment {...comment} key={comment._id} />)}
        </div>
    )
}