import React,{useEffect,useContext,useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

export default function LoginPage() {
    const {user,handleUserLogin} = useAuth()
    const navigate = useNavigate()


    const [credentials,setCredentials] =  useState({
        email:"",
        password:""
    })

    useEffect(()=>{
       if(user){
       navigate('/')
       }
    },[])
    const handleInputChange = (e) => {
     let name = e.target.name
     let value = e.target.value

     setCredentials({...credentials,[name]:value})
     
    }
    
  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
       <p className='login'> Login</p>
           <form onSubmit={(e)=>{handleUserLogin(e,credentials)}}>
            
            <div className='field--wrapper'>
                <label htmlFor="">Email:</label>
                <input type="email" required name='email' placeholder='Enter Your Email..' 
                value={credentials.email}
                onChange={handleInputChange}
                />

            </div>
            <div className='field--wrapper'>
                <label htmlFor="">Password:</label>
                <input type="password" required name='password' placeholder='Enter Your Password..' 
                value={credentials.password}
                onChange={handleInputChange} className='input'
                />
                 
            </div>
            <div className='field--wrapper'>
                 <input type="submit" value="Login" className='btn btn--lg btn--main' />
            </div>

           </form>
           <p className='register-link'>dont have an account yet? Register <Link to="/register">here</Link></p>
      </div>
    </div>
  )
}
