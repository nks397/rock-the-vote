import React, {useState} from "react"

function IssueForm(props) {
    const {submit, _id, btnText} = props

    const initInputs = {
        title: props.title || "",
        description: props.description || "",
        votes: 0,
        voters: []
    }

    const [issueInputs, setIssueInputs] = useState(initInputs)
    
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
        <button>{btnText}</button>
    </form>
    )
}

export default IssueForm