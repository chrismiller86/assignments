import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'


export default function Comment(props) {
    const { description } = props
    return (
        <div classname="comment">
            <p>{description}</p>
        </div>
    )
}