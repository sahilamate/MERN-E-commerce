import React, { use, useContext } from 'react'
import AppContext from '../../context/AppContext'


const Profile = () => {

    const {user} = useContext(AppContext)
    console.log(user)
  return (
    <div className='text-center'>   
        <p>{user.name}</p>
        <p>{user.email}</p>
        
    </div>
  )
}

export default Profile