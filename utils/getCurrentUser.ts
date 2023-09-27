import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';

export async function getSession(){
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
      const session:any = await getSession();
      if(session){
        return session.user;
      } else {    
        return null;
      }

  } catch (error) {
    console.log('ERROR: ',error)
  }
};
