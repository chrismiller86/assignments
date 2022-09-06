import React, { useState } from "react";

function AddBountyForm(props) {

    const initInputs = { firstName: props.firstName || "", lastName: props.lastName || "", isLiving: props.isLiving || true, bounty: props.bounty || 0, type: props.type || "" }
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }))
    }

    function handleSubmit(e) {
        // e.preventDefault()
        props.submit(inputs, props._id)
        setInputs(initInputs)
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
                placeholder="First Name"
            />
            <input
                type="text"
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
                placeholder="Last Name"
            />
            <input
                type="text"
                name="isAlive"
                value={inputs.isLiving}
                onChange={handleChange}
                placeholder="Is Alive?"
            />
            <input
                type="number"
                name="bounty"
                value={inputs.bounty}
                onChange={handleChange}
                placeholder="Bounty"
            />
            <input
                type="text"
                name="type"
                value={inputs.type}
                onChange={handleChange}
                placeholder="Sith or Jedi"
            />
            <button>{props.btnText}</button>

        </form>
    )
}

export default AddBountyForm