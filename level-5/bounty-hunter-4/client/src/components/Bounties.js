import React, { useState } from "react";
import AddBountyForm from "./AddBountyForm";

function Bounties(props) {
    const { firstName, lastName, isLiving, type, bounty, _id } = props
    const [editToggle, setEditToggle] = useState(false)
    return (
        <div>

            {!editToggle ?
                <>
                    <h1>Name: {firstName} {lastName}</h1>
                    <h2>Living: {isLiving}</h2>
                    <h2>Type: {type}</h2>
                    <h2>Price: {bounty}</h2>
                    <button onClick={() => props.deleteBounty(_id)}>Delete</button>
                    <button onClick={() => setEditToggle(prevToggle => !prevToggle)}
                    >
                        Edit
                    </button>

                </>
                :
                <>
                    <AddBountyForm
                        firstName={firstName}
                        lastName={lastName}
                        isLiving={isLiving}
                        type={type}
                        bounty={bounty}
                        _id={_id}
                        btnText="Submit Edit"
                        submit={props.editBounty} />

                    <button onClick={() => setEditToggle(prevToggle => !prevToggle)}
                    >
                        Close
                    </button>
                </>
            }
        </div >

    )
}

export default (Bounties)