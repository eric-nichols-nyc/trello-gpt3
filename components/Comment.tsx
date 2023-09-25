import React from 'react'
import Avatar from 'react-avatar'
import {format} from 'date-fns'
// display user comment and avatar
const UserComment = ({creatorName, comment, date}: any) => {
  // create markup for comment
  const createmarkup = (html: any) => {
    return {
      __html: html
    }
  }
  return (
    <div className="flex mb-4">
      <Avatar className="cursor-pointer mr-2" name={creatorName} size="30" round={true} />
      <div className="flex flex-col w-full">
        <p className="text-sm mb-1"><span>{creatorName}  </span><span className="text-xs text-slate-400">{format(new Date(date),'MMMM do')}</span></p> 
        <p className="text-sm mb-1" dangerouslySetInnerHTML={createmarkup(`${comment}`)} />
      </div>
    </div>
  )
}

export default UserComment