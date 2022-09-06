import React, { useState, useEffect } from "react";
import axios from "axios"
import Bounties from "./components/Bounties.js"
import AddBountyForm from "./components/AddBountyForm.js";

export default function App() {
    const [bounty, setBounty] = useState([])

    function getBounty() {
        axios.get("/bounty")
            .then(res => setBounty(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addBounty(newBounty) {
        axios.post("/bounty", newBounty)
            .then(res => {
                setBounty(prevBounties => [...prevBounties, res.data])
            })
    }

    function deleteBounty(bountyId) {
        axios.delete(`/bounty/${bountyId}`)
            .then(res => {
                setBounty(prevBounties => prevBounties.filter(bounty => bounty._id !== bountyId))
            })
            .catch(err => console.log(err))
    }

    function editBounty(updates, bountyId) {
        axios.put(`/bounty/${bountyId}`, updates)
            .then(res => {
                setBounty(prevBounties => prevBounties.map(bounty => bounty._id !== bountyId ? bounty : res.data))
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        getBounty()
    }, [])


    return (
        <div>
            <AddBountyForm
                submit={addBounty}
                btnText="Add Bounty"
            />
            {
                bounty.map(bounty =>
                    <Bounties
                        {...bounty}
                        key={bounty._id}
                        deleteBounty={deleteBounty}
                        editBounty={editBounty} />)
            }
        </div>
    )
}


