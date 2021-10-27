import React, {useState, useContext} from "react"
import {Tooltip} from "antd"
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons'
import {UserContext} from "../context/AuthProvider"

function UpvoteDownvote(props) {
    const {upvote, upvoteCounter, downvote, downvoteCounter} = useContext(UserContext)
    const {_id} = props

    return (
        <div>
            {/* (1)Need conditional statement for voting.
                (2)Can't figure out the logic for my
                    upvote and downvote function in
                    AuthProvider.
            */}
            <Tooltip>
                <LikeOutlined type="upvote"
                    onClick={()=>upvote(_id)}
                /> 
            </Tooltip>
            <span>{upvoteCounter}</span>
            <Tooltip>
                <DislikeOutlined type="downvote"
                    onClick={()=>downvote(_id)}
                />
            </Tooltip>
            <span>{downvoteCounter}</span>
        </div>
    )
}

export default UpvoteDownvote