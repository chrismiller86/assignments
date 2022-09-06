import React, { useState } from "react";
import AddBountyForm from "./AddBountyForm";

function List(props) {
    const { name, bounty, isAlive, affiliation, _id } = props
    const [editToggle, setEditToggle] = useState(false)
    return (
        <div>
            {!editToggle ?
                <>
                    <h1>{name}</h1>
                    <p>Bounty: ${bounty}</p>
                    <p>Alive: ${isAlive}</p>
                    <p>Affiliation:{affiliation}</p>
                    <button onClick={() => props.deleteBounty(_id)} >Delete</button>
                    <button onClick={() => setEditToggle(prevToggle => !prevToggle)} >Edit</button>
                </>
                :
                <>
                    <AddBountyForm
                        name={name}
                        bountye={bounty}
                        isAlive={isAlive}
                        affiliation={affiliation}
                        _id={_id}
                        btnText="submit edit"
                        submit={props.editBounty}
                    />
                    <button onClick={() => setEditToggle(prevToggle => !prevToggle)} >Close</button>
                </>
            }
        </div>
    )
}

export default List