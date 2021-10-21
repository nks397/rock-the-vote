import React, {useState} from "react"



function IssueForm(props) {
    const {addIssue, updateIssue, submit, _id, btnText} = props

    const initInputs = {
        title: props.title || "",
        description: props.description || "",
    }

    const [issueInputs, setIssueInputs] = useState(initInputs)
    

    // create handlechange, inputs in jsx

    function handleChange(e){
        const {name, value} = e.target
        setIssueInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        submit(issueInputs, _id)
        // addIssue(issueInputs)
        // updateIssue(issueInputs, _id)
        setIssueInputs(initInputs)
    }

    const {title, description} = issueInputs

    return (
    <form className="issue-form-container" onSubmit={handleSubmit}>
        <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Title"
        />
        <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Description"
        />
        {/* <button>Add Issue</button> */}
        <button>{btnText}</button>
    </form>
    )
}

export default IssueForm