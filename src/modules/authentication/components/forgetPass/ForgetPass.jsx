import React from 'react';
import logo from '../../../../assets/images/4 4.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function ForgetPass() {
  let navigate = useNavigate()
  let {register,
    formState:{isSubmitting, errors},
    handleSubmit
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response =await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data);
      toast.success(response?.data?.message || 'OTP sent to your email');
      navigate('/reset-password', {state : data.email});
      
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
                <h3 className='h5'>Forget Your Password? </h3>
                <span className='text-muted'>No worries! Please enter your email and we will send a password reset link </span>
              </div>  
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
              <i className='fa fa-envelope' aria-hidden='true'></i>
              </span>
             <input
              type="text"
              className="form-control"
              placeholder="Enter Your E-mail"
              aria-label="email"
               aria-describedby="basic-addon1"
               {...register('email',{
                required: 'email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                   message:'Email is not vaild'
                }
               })}
               />
              
             </div>
             {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
               <button disabled={isSubmitting} className='btn btn-success w-100 my-2'>
                {isSubmitting ? "submitting ..." : "submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  )
}
