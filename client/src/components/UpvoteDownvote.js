import React, {useState, useContext} from "react"
import {Tooltip} from "antd"
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons'
import {UserContext} from "../context/AuthProvider"

function UpvoteDownvote(props) {
    const { voteHandler, user} = useContext(UserContext)
   let {_id, upvote, downvote, username, issues, votedUsers} = props
    // const [voters, setVoters] = useState([])
    const [isVoted, setIsVoted] = useState(false)
    // const [vote, setVote] = useState(0)

    
    //   stop count from going to a negative number when decrementing
// if(num > 0) {
//     setNum(num - 1)
// } else {
//     setNum(0)
// }
console.log(downvote, "downvoteCount")
console.log(upvote, "upvoteCount")
// console.log(username, "username")
console.log(_id, "id")

    function voting(vote, issueId, user){
        // const castedVote = votedUsers.includes(user)
        const castedVote = votedUsers.indexOf(user) !== -1
        castedVote ? 
        alert("You have already voted")
        :
        voteHandler(vote, issueId)
        window.location.reload()
        console.log(castedVote, "CastedVote")
        console.log(votedUsers, "votedUsersArray")
        console.log(user, "Users")
        // console.log(username, "username")
    
    }

//    function voting(vote, issueId) {  
//         if(votedUsers.includes(_id)) { //if upvotes have a userId (true),
//           votedUsers.filter(voter => voter !== _id) //find that id, take it out of the upvotes arr, and decrement score
//           vote--
//           voteHandler(vote, issueId)
//         } else {
//           if(votedUsers.includes(_id)) { //if downvotes arr have a userId
//             votedUsers.filter(voter => voter !==_id) //find it, remove it, and increment score
//             vote++
//           }
//           votedUsers.push(_id) //id is being pushed into upvotes arr
//           vote++ //score is incremented
//           voteHandler(vote, issueId)
//         //   console.log(issue)
//         //   editIssue(issue , _id )
//         }
//       }
    
    return (
        <div>
            {/* (1)Need conditional statement for voting.
                (2)Can't figure out the logic for my
                    upvote and downvote function in
                    AuthProvider.
            */}
                <Tooltip>
                    <LikeOutlined type="upvote"
                        // onClick={()=>upvoteHandler(_id)}
                        // onClick={()=>votingFunctionality("upvote", _id, user._id)}
                        onClick={() =>voting("upvotes", _id, user._id)}
                    /> 
                </Tooltip>
                {/* <span>{totalVotes}</span> */}
                <span>{upvote}</span>
                <Tooltip>
                    <DislikeOutlined type="downvote"
                        // onClick={()=>downvoteHandler(_id)}
                        // onClick={()=>votingFunctionality("downvote", _id, user._id)}
                        onClick={() => voting("downvotes", _id, user._id)}
                    />
                </Tooltip>
                {/* <span>{totalVotes}</span> */}
                <span>{downvote}</span>

        </div>
    )
}
// }

export default UpvoteDownvote