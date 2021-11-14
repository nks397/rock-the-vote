import React, {useState, useContext} from "react"
import {Tooltip} from "antd"
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons'
import {AuthContext} from "../context/AuthProvider"

function UpvoteDownvote(props) {
    const { handleVote, user} = useContext(AuthContext)
   let {_id, upvote, downvote, votedUsers} = props

console.log(downvote, "downvoteCount")
console.log(upvote, "upvoteCount")


    function userVoting(vote, issueId, userId){
        // const castedVote = votedUsers.includes(user)
        const castedVote = votedUsers.indexOf(userId) !== -1
        castedVote ?
        alert("Your vote has already been submitted.")  
        :
        handleVote(vote, issueId)
        window.location.reload()
        // console.log(castedVote, "CastedVote")
        // console.log(votedUsers, "votedUsersArray")
        // console.log(userId, "Users")
    }
    
    return (
        <div>
                <Tooltip>
                    <LikeOutlined type="upvote"
                        title="Upvote" onClick={() =>userVoting("upvotes", _id, user._id)}
                    /> 
                </Tooltip>
                {/* <span>{totalVotes}</span> */}
                <span>{upvote}</span>
                <Tooltip>
                    <DislikeOutlined type="downvote"
                        title="Downvote" onClick={() => userVoting("downvotes", _id, user._id)}
                    />
                </Tooltip>
                {/* <span>{totalVotes}</span> */}
                <span>{downvote}</span>

        </div>
    )
}
// }

export default UpvoteDownvote