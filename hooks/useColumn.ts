import useSWR from 'swr';

export const useDeleteCard = (path:string) => {
const {mutate} = useSWR(path);

 const deleteCardFromDB = async (id: string) => {
   const response = await fetch(`/api/cards/${id}`, {
     method: 'DELETE',
   });

   if (!response.ok) throw new Error('Failed to delete card');

   mutate();
 };

  return deleteCardFromDB;
}