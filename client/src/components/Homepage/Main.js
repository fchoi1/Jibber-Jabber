import React, { useEffect, useState } from 'react';
import { QUERY_USERS } from '../../utils/queries';
import { useQuery } from '@apollo/client'

const Main = () => {
    const [search, setSearch] = useState("")
    const searching = (e)=>{
        setSearch(e.target.value)
    }

    const {loading,errors,data,refetch} = useQuery(QUERY_USERS)

    useEffect(() => {
        refetch();
    }, [refetch, data]);

    const g = data?.users || 0
    if (loading) {
        return <h2>LOADING...</h2>;
      }
    return(
    
    <div className='border p-3'>
        <h1>Welcome to your main page</h1>
        
        <form action="">

            <input type="search" id='search' className='p-2' onChange={searching} value={search} placeholder='search your friends...' />

        </form>
    </div>
    )
}
export default Main;
