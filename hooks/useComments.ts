import useSWR from 'swr';

export const useDeleteComment = (path:string) => {
const {mutate} = useSWR(path);

 const deleteCommentFromDB = async (id: string) => {
  console.log('id ', id)
   const response = await fetch(`/api/comments/${id}`, {
     method: 'DELETE',
   });

   if (!response.ok) throw new Error('Failed to delete comment');
   console.log('Delete was successful')
   mutate();
 };

  return deleteCommentFromDB;
}