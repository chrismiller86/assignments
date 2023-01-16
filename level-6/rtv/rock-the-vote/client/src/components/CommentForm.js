import React, { useState } from 'react'
import { UserContext } from '../context/UserProvider.js'

export default function CommentForm(props) {
    const { issueId, addComment } = props


    const initInputs = {
        description: "",
        issue: { issueId },
        user: {}

    }

    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        addComment(issueId, inputs)
        setInputs(initInputs)
    }

    const { description } = inputs

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Add Comment"
            />
            <button>Add Comment</button>
        </form>
    )

}