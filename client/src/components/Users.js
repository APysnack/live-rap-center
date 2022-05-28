import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import UserAvatar from './UserAvatar';
// import CreateUser from '.CreateUser';


const GET_USERS = gql`
{
    users{
        id
        username
    }
}
`

function Users() {
    const { loading, data } = useQuery(GET_USERS);

    return (
        <>  
            {loading ? "Loading..." : 
                data.users.map(user => (
                        <div key={user.id}>{user.username}</div>
                ))
            }
        </>
    )
}

export default Users;