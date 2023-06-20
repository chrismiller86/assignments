import React from "react";
import Issue from "./Issue.js"


export default function IssueList(props){
    const { issues } = props
    

    const sortedList = [].concat(issues)
        .sort((a,b) => b.likedBy.length - b.dislikedBy.length > a.likedBy.length - a.dislikedBy.length ? 1 : -1)
        .map((issue) =>
            <Issue key={issue._id} {...issue}/>
        )

    return (
        <div className='post-list'>
            { sortedList }
        </div>
    )
}