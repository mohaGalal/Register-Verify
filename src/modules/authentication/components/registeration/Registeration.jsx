import React, { useEffect, useState } from 'react';
import logo from '../../../../assets/images/4 4.svg';
import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EMAIL_VALIDATION, passwordValidtion } from '../../../../services/validation';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { toast } from 'react-toastify';

export default function Registeration() {
  const[isPasswordVisible, setIsPasswordVisible] =useState(false);
  let navigate = useNavigate();

  let {register,
    formState:{errors},
    handleSubmit,
    watch,
    trigger
  } = useForm({mode:"onChange"});

  // const password = watch("password");
  // const confirmPassword = watch("password");
  // useEffect(()=>{
  //   if(confirmPassword){
  //     trigger("confirmPassword")
  //   } 
  // },[password ,confirmPassword,trigger]);

  const onSubmit = async (data) => {

    const formData = new FormData();
      formData.append("userName", data?.userName);
      formData.append("email", data?.email);
      formData.append("country", data?.country);
      formData.append("profileImage", data?.profileImage[0]);
      formData.append("phoneNumber", data?.phoneNumber);
      formData.append("password", data?.password);
      formData.append("confirmPassword", data?.confirmPassword);


    try {
      let response =await axiosInstance.post(USERS_URLS.REGISTER,formData);
      toast.success('please verify your Registeration');
      navigate('/verify');
      // console.log(formData)
    } catch (error) {
      toast.error(error.response.data.message)
      // console.log(error)
    }
  }
  return (
    <div className='auth-container'>
    <div className="container-fluid bg-overlay">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-8 col-lg-6 bg-white rounded rounded-2 px-5 py-3 ">
          <div>
            <div className="logo-container  text-center">
              <img className='w-75' src={logo} alt=''/>
            </div>
            <div className="title my-3">
              <h3 className='h5'>Register</h3>
              <span className='text-muted'>Welcome Back! Please enter your details</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className='d-flex'>
                {/* userName  */}
              <div className={styles["form-group"]}>
              <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-mobile-screen"></i>
              </span>
              <input 
              
              type="text"
              className="form-control"
              placeholder="User Name"
              aria-label="text"
               aria-describedby="basic-addon1"
              {...register('userName',{
                required :'UserName is required',
                
                
              })}
              />
            </div>
            {errors.userName&&<span className='text-danger'>{errors.userName.message}</span>}
            {/* country  */}
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-envelope' aria-hidden='true'></i>
              </span>
              <input 
              
              type="text"
              className="form-control"
              placeholder="Country"
              aria-label="text"
               aria-describedby="basic-addon1"
              {...register('country',{
                required :'country is required'
               
              })}
              />
            </div>
            {errors.country&&<span className='text-danger'>{errors.country.message}</span>}
            {/* password  */}
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-key' aria-hidden='true'></i>
              </span>
              <input 
              type= {isPasswordVisible ? "text": "password"} 
              className="form-control" 
              placeholder="password" 
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
          
              </div>
              {/* email  */}
              <div className={styles["form-group"]}>
              <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-key' aria-hidden='true'></i>
              </span>
              <input 
              // type= {isPasswordVisible ? "text": "password"}
              className="form-control" 
              placeholder="Enter Your Email" 
              aria-label="email" 
              aria-describedby="basic-addon1"
              {...register('email', EMAIL_VALIDATION)}
              />
              
            </div>
            {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
             {/* phoneNumber  */}
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-key' aria-hidden='true'></i>
              </span>
              <input 
              
              type='number'
              className="form-control" 
              placeholder="Phone Number" 
              aria-label="number" 
              aria-describedby="basic-addon1"
              {...register('phoneNumber',{
                required :'phoneNumber is required',
                
              })}
              />
              
            </div>
            {errors.phoneNumber&&<span className='text-danger'>{errors.phoneNumber.message}</span>}
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
              {...register('confirmPassword', passwordValidtion)}
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
              </div>
              </div>
              <div>
                <span className='mx-2'>upload your profile Image</span>
        <input type='file'  {...register("profileImage")}/>
        
        
             </div>
            <Link>Login Now?</Link>
           
            <button className='btn btn-success w-100 my-2'>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
