import React from 'react';
import logo from '../../../../assets/images/4 4.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { EMAIL_VALIDATION } from '../../../../services/validation';


export default function Verify() {
  let navigate = useNavigate()
  let {register,
    formState:{errors},
    handleSubmit
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response =await axiosInstance.put(USERS_URLS.VERIFY,data);
    
      toast.success('good registeration')
      navigate('/login')
      
    } catch (error) {
      toast.error(error.response.data.message)
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
                <h3 className='h5'>Verify</h3>
                <span className='text-muted'>Welcome Back! Please enter your details</span>
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
                {...register('email',EMAIL_VALIDATION)}
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
                placeholder="Enter Your code" 
                aria-label="password" 
                aria-describedby="basic-addon1"
                {...register('code', {
                  required :'code is required',
                  
                })}
                />
              </div>
              {errors.code&&<span className='text-danger'>{errors.code.message}</span>}
              
              <button className='btn btn-success w-100 my-2'>Verify</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

