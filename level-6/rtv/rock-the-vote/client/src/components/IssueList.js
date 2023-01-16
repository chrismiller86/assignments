import React, { useEffect, useContext } from "react";
import Issue from "./Issue.js"
import { UserContext } from "../context/UserProvider.js";

export default function IssueList(props) {
    const { issues } = props
    const { getIssues } = useContext(UserContext)

    useEffect(() => { getIssues() }, [])

    return (

        <div className="issue-list">
            {issues.map(issue => <Issue {...issue} key={issue._id} />)
            }

        </div>
    )
}