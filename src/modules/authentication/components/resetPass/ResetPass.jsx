import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/4 4.svg';
import { toast } from 'react-toastify';
import { passwordValidtion } from '../../../../services/validation';

export default function ResetPass() {
  let navigate = useNavigate();
  const location = useLocation();
  const[isPasswordVisible, setIsPasswordVisible] =useState(false)

  let {register,
    watch,
    trigger,
    formState:{errors},
    handleSubmit
  } = useForm({defaultValues : {email : location.state}, mode:"onChange"});

  const password = watch("password");
  const confirmPassword = watch("password");
  useEffect(()=>{
    if(confirmPassword){
      trigger("confirmPassword")
    } 
  },[password ,confirmPassword,trigger]);

  const onSubmit = async (data) => {
    try {
      let response =await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data);
      toast.success('login successfuly');
      navigate('/login');
      // console.log(response.data)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }
  return (
    <div className='auth-container'>
    <div className="container-fluid bg-overlay">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-6 col-lg-4 bg-white rounded rounded-2 px-5 py-3 ">
          <div>
            <div className="logo-container  text-center">
              <img className='w-75' src={logo} alt=''/>
            </div>
            <div className="title my-3">
              <h3 className='h5'>Rest Password</h3>
              <span className='text-muted'>Please Your Otp or Check Your Inbox</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-envelope' aria-hidden='true'></i>
              </span>
              <input 
              disabled={true}
              type="text"
              className="form-control"
              placeholder="E-mail"
              aria-label="email"
               aria-describedby="basic-addon1"
              {...register('email',{
                required :'email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:'Email is not vaild'
                }
              })}
              />
            </div>
            {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-key' aria-hidden='true'></i>
              </span>
              <input 
              type="text" 
              className="form-control" 
              placeholder="OTP" 
              aria-label="text" 
              aria-describedby="basic-addon1"
              {...register('seed', {
                required :'otp is required',
                
              })}
              />
            </div>
            {errors.seed&&<span className='text-danger'>{errors.seed.message}</span>}
            {/* password */}
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-key' aria-hidden='true'></i>
              </span>
              <input 
              type= {isPasswordVisible ? "text": "password"}
              className="form-control" 
              placeholder="New Password" 
              aria-label="password" 
              aria-describedby="basic-addon1"
              {...register('password', passwordValidtion)}
              />
              <button 
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              onMouseDown={(e) =>{e.preventDefault()}} 
              onMouseUp={(e) =>{e.preventDefault()}}
              type='button' className="input-group-text" id="basic-addon1">
                <span className='sr-only'>{isPasswordVisible? "hide password" : "show password"}</span>
                <i className={`fa-solid ${isPasswordVisible ?"fa-eye" :"fa-eye-slash"}`} aria-hidden='true'></i>
              </button>
            </div>
            {errors.password&&<span className='text-danger'>{errors.password.message}</span>}
            {/* confirmPassword */}
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-key' aria-hidden='true'></i>
              </span>
              <input 
              type = {isPasswordVisible ? "text": "password"} 
              className="form-control" 
              placeholder="Confirm New Password" 
              aria-label="password" 
              aria-describedby="basic-addon1"
              {...register('confirmPassword', {
                required :'password is required',
                validate :(confirmPassword) => {
                  return confirmPassword == watch("password")? "" : "passwords don't match"
                }
                
              })}
              />
              <button 
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              onMouseDown={(e) =>{e.preventDefault()}} 
              onMouseUp={(e) =>{e.preventDefault()}}
              type='button' className="input-group-text" id="basic-addon1">
                <i className={`fa-solid ${isPasswordVisible ?"fa-eye" :"fa-eye-slash"}`} aria-hidden='true'></i>
              </button>
            </div>
            {errors.confirmPassword &&<span className='text-danger'>{errors.confirmPassword.message}</span>}
           
            <button className='btn btn-success w-100 my-2'>Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
