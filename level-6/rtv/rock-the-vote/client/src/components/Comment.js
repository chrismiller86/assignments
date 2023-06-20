import React from 'react'


export default function Comment(props) {
    const { description } = props
    return (
        <div className="comment">
            <p>{description}</p>
        </div>
    )
}