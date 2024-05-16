import { useEffect, useState } from 'react'
import { useSearchUsersMutation, } from '../../../redux/features/user/user/profileApiSlice'
import { debounce } from 'lodash';
import IUser from '../../../types/database';
import toast from 'react-hot-toast';

export default function useUserSearch(key:string, page:number) {

  const [users, setUsers] = useState<{userName:string,profile:string}[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const[search]=useSearchUsersMutation()

  useEffect(()=>{
    setUsers([])
  },[key])

   

  useEffect(() => {
     // Debounced fetch function
     const debouncedFetchUsers = debounce(async () => {
      if (!key) return; // Early exit if no key
  
      setLoading(true);
  
      try {
        const res = await search({ key, page }).unwrap();
  
        setUsers((prev) => {
          // Combine results efficiently and remove duplicates
          const combinedUsers = [...prev, ...res.data.users];
          const uniqueUsers = combinedUsers.reduce((acc, cur) => {
            return acc.some((item:IUser) => item.id === cur.id) ? acc : [...acc, cur];
          }, []);
          return uniqueUsers;
        });
  
        setHasMore(res.data.lastPage > page);

      } catch (error) {
        console.error(error);
        toast('something went wrong',{position:'top-center'})
      } finally {
        setLoading(false);
      }
    }, 5000);
    debouncedFetchUsers()
    
  }, [ key, page, search])



  return {loading,users, hasMore}
}