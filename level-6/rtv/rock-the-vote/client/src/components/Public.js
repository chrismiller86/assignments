import React, { useContext, useEffect } from "react";
import IssueList from "./IssueList.js";
import { UserContext } from '../context/UserProvider.js'

export default function Public() {

    const { issues, getIssues } = useContext(UserContext)

    useEffect(() => { getIssues() }, [])


    return (
        <div className="public">

            <h1>Current Issues</h1>
            <IssueList issues={issues} />
        </div>
    )
}