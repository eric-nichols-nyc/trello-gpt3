import useSWR from 'swr';
import axios from 'axios';

export const useUpdateBoard = (path:string) => {
  const { mutate } = useSWR(path);

    const updateBoardInDB = async(id:string, obj: unknown) => {
      try {
        await axios.put(`${path}/${id}`, obj)
        mutate();
        return {message: 'Update successful'}
      } catch (error) {
        console.log('Error: ', error)
      }
    }

    return updateBoardInDB;
}