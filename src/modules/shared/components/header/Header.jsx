import React from 'react';
import headerImg from '../../../../assets/images/header-img.png'

export default function Header({title ,description}) {
  return (
    <div className='header-container mx-3 p-5 row justify-content-between align-items-center'>
      <div className='caption w-50 text-white col-md-6'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="header-img col-md-6 text-end">
        <img className='img-fluid' src={headerImg} alt=''/>
      </div>
    </div>
  )
}
