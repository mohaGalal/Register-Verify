import React from 'react'
import avatar from '../../../../assets/images/Ellipse 235.png'

export default function Navbar({loginData}) {
  return (
    <div className='bg-white py-2 d-flex justify-content-end align-items-center'>
      <img className='mx-3' src={avatar} alt='user-image'/>
      <span >{loginData?.userName}</span>
    </div>
  )
}
