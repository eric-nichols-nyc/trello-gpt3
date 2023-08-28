import React from 'react'
import Avatar from 'react-avatar'
// display user comment and avatar
const UserComment = ({creatorName, comment, date}: any) => {
  return (
    <div className="flex mb-4">
      <Avatar className="cursor-pointer mr-2" name={creatorName} size="30" round={true} />
      <div className="flex flex-col mr-2">
        <p className="text-sm mb-1"><span>{creatorName} </span><span className="text-xs text-slate-400">{date}</span></p> 
        <p className="bg-gray-800 p-2 rounded text-sm text-slate-200">{comment}</p>
      </div>
    </div>
  )
}

export default UserComment