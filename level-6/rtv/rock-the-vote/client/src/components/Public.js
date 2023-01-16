import React, { useContext } from "react";
import IssueList from "./IssueList.js";
import { UserContext } from '../context/UserProvider.js'

export default function Public() {

    const { issues } = useContext(UserContext)

    return (
        <div className="public">

            <h1>Current Issues</h1>
            <IssueList issues={issues} />
        </div>
    )
}