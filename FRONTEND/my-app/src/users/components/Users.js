import react from 'react'
import UserList from './UserList';

const Users = ()=>{

    const USERS = [{id:'hi' , name='Mark' , image='https://media.istockphoto.com/photos/mid-adult-man-using-a-smart-phone-to-monitor-his-cryptocurrency-and-picture-id1324164290?b=1&k=20&m=1324164290&s=170667a&w=0&h=rOZ8s_KnjkiLYXLaczq2vBKkYCKDdIdxvul_mxmQebk=' ,places=3}]
    return(
        <UserList items={USERS} />
    );
}

export default Users;