import React from "react"

function authForm(props) {
    const {
        handleChange,
        handleSubmit,
        btnText,
        inputs: {
            username,
            password
        }
    } = props

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={username} 
                    name="username" 
                    onChange={handleChange} 
                    placeholder="Username"
                />
                <input 
                    type="text" 
                    value={password} 
                    name="password" 
                    onChange={handleChange} 
                    placeholder="Password"/>
                <button>{ btnText }</button>
            </form>
        </div>
    )
}

export default authForm
