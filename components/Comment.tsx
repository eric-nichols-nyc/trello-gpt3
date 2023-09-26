import React from 'react'
import Avatar from 'react-avatar'
import { format } from 'date-fns'
import { useDeleteComment } from '@/hooks/useComments';

interface Props {
  id: string;
  creatorName: string;
  date: string;
  comment: string;
}
// display user comment and avatar
const UserComment = ({ creatorName, comment, date, id }: Props) => {
  const deleteCommentFromDB = useDeleteComment('/api/comments')

  return (
    <div className="flex mb-4">
      <Avatar className="cursor-pointer mr-2" name={creatorName} size="30" round={true} />
      <div className="flex flex-col w-full">
        <p className="text-sm mb-1"><span>{creatorName}  </span><span className="text-xs text-slate-400">{format(new Date(date), 'MMMM do')}</span></p>
        <p className="text-sm mb-1 bg-slate-800 p-2 rounded-md">{comment}</p>
        <div className="flex gap-2 text-xs">
          {/* <span className="cursor-pointer underline">edit</span> */}
          <span
            onClick={() => deleteCommentFromDB(id)}
            className="cursor-pointer underline">delete</span>
        </div>
      </div>
    </div>
  )
}

export default UserComment