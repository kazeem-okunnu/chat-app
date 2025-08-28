import React,{useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

export default function RegisterPage() {

    const {handleUserRegister} = useAuth()

       const [credentials,setCredentials] =  useState({
            name:"",
            email:"",
            password1:"",
            password2:"",
            
        })

        const handleInputChange = (e) => {
            let name = e.target.name
            let value = e.target.value
       
            setCredentials({...credentials,[name]:value})
            
           }
    
  return (
    <div className='auth--container'>
    <div className='form--wrapper'>
     <p className='login'> Register</p>
         <form onSubmit={(e)=>{handleUserRegister(e,credentials)}}>
         <div className='field--wrapper'>
              <label >Username:</label>
              <input type="Text" required name='name' placeholder='Enter Your Username..' 
              value={credentials.name}
              onChange={handleInputChange}
              />

          </div>
          <div className='field--wrapper'>
              <label htmlFor="">Email:</label>
              <input type="email" required name='email' placeholder='Enter Your Email..' 
              value={credentials.email}
              onChange={handleInputChange}
              />

          </div>
          <div className='field--wrapper'>
              <label htmlFor="">Password:</label>
              <input type="password" required name='password1' placeholder='Enter Your Password..' 
              value={credentials.password1}
              onChange={handleInputChange} className='input'
              />
               
          </div>
          <div className='field--wrapper'>
              <label htmlFor=""> Confirm Password:</label>
              <input type="password" required name='password2' placeholder='Enter Your Password..' 
              value={credentials.password2}
              onChange={handleInputChange} className='input'
              />
               
          </div>
          
          <div className='field--wrapper'>
               <input type="submit" value="Register" className='btn btn--lg btn--main' />
          </div>

         </form>
         <p className='register-link'>Already have an account yet? Login <Link to="/login">here</Link></p>
    </div>
  </div>
  )
}
