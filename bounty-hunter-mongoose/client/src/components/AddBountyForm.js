import React, { useState } from "react";

function AddBountyForm(props) {
    const initInputs = { name: props.name || "", price: props.price || "" }
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.submit(inputs, props._id)
        setInputs(initInputs)
    }

    return (
        <form onSubmit={handleSubmit} >
            <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                type="text"
                name="bounty"
                value={inputs.bounty}
                onChange={handleChange}
                placeholder="Bounty price"
            />
            <input
                type="text"
                name="affiliation"
                value={inputs.affiliation}
                onChange={handleChange}
                placeholder="Affiliation"
            />
            <input
                type="text"
                name="isAlive"
                value={inputs.isAlive}
                onChange={handleChange}
                placeholder="Is Alive"
            />
            <button>{props.btnText}</button>
        </form >
    )
}

export default AddBountyForm