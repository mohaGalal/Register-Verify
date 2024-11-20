import React from 'react';
import noData from '../../../../assets/images/no-data.svg';

export default function NoData() {
  return (
    <div className='py-5 text-center'>
        <img src= {noData} alt='no data'/>
        <h5 className='my-3'>No Data !</h5>
        <p>
        are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}
