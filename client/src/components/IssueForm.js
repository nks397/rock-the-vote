import React, {useState} from "react"

const initInputs = {
        title: "",
        description: "",
    }

function IssueForm(props) {
    const [issueInputs, setIssueInputs] = useState(initInputs)
    const {addIssue} = props

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
        addIssue(issueInputs)
        setIssueInputs(initInputs)
    }

    const {title, description} = issueInputs

    return (
        <div>
            My Issue Form
            <form onSubmit={handleSubmit}>
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
                <button>Add Issue</button>
            </form>
        </div>
    )
}

export default IssueForm