import { useAuth } from '../utils/AuthContext'
import React from 'react'
import {LogOut} from 'react-feather'

export default function Header() {
    const {user,handleUserLogOut} = useAuth()
  return (
    <div id='header--wrapper'>
       {user? (
        <>
        Welcome {user.name}
        <LogOut className='header--link' onClick={handleUserLogOut} />
        </>
       ):(
        <button>Login</button>
       )}
    </div>
  )
}
