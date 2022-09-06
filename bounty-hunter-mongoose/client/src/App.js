import React, { useState, useEffect } from "react";
import axios from "axios"
import List from "./components/List";
import AddBountyForm from "./components/AddBountyForm";



function App() {
    const [list, setList] = useState([])



    function getList() {
        axios.get("/hitlist")
            .then(res => setList(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getList()
    })

    function addBounty(newBounty) {
        axios.post("/hitlist", newBounty)
            .then(res => {
                setList(prevList => [...prevList, res.data])
            })
            .catch(err => console.log(err))
    }

    function deleteBounty(bountyId) {
        axios.delete(`./hitlist/${bountyId}`)
            .then(res => {
                setList(prevbounties => prevbounties.filter(bounty => bounty._id !== bountyId))
            })
            .catch(err => console.log(err))
    }

    function editBounty(updates, bountyId) {
        axios.put(`./hitlist/${bountyId}`, updates)
            .then(res => {
                setList(prevBounties => prevBounties.map(bounty => bounty._id !== bountyId ? bounty : res.data))
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <AddBountyForm
                submit={addBounty}
                btnText="Add Bounty"
            />
            {
                list.map(item =>
                    <List
                        {...bounty}
                        key={bounty.name}
                        deleteBounty={deleteBounty}
                        editBounty={editBounty}
                    />)}
        </div>
    )
}

export default App