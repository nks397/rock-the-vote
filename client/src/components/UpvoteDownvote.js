import React, {useContext} from "react"
import {Tooltip} from "antd"
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import {AuthContext} from "../context/AuthProvider"

function UpvoteDownvote(props) {
    const { handleVote, user} = useContext(AuthContext)
    let {_id, upvote, downvote, votedUsers} = props

    function userVoting(vote, issueId, userId){
        // voted user is not found true
        const castedVote = votedUsers.indexOf(userId) !== -1
        castedVote ?
        alert("Your vote has already been submitted.")  
        :
        handleVote(vote, issueId)
        window.location.reload()
    }
    
    return (
        <div>
            <Tooltip>
                <LikeOutlined type="upvote"
                    title="Upvote" onClick={() =>userVoting("upvotes", _id, user._id)}
                /> 
            </Tooltip>
            <span>{upvote}</span>
            <Tooltip>
                <DislikeOutlined type="downvote"
                    title="Downvote" onClick={() => userVoting("downvotes", _id, user._id)}
                />
            </Tooltip>
            <span>{downvote}</span>

        </div>
    )
}

export default UpvoteDownvote