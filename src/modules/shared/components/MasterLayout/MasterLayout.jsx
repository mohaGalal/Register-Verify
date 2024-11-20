import React from 'react'
import Navbar from '../navbar/Navbar'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom';
import SideBar from '../sideBar/SideBar';



export default function  MasterLayout({loginData}) {
  return (
    <div className='d-flex'>
      <SideBar/>
      <div className='w-100 '>
        <Navbar loginData={loginData}/>
        <Outlet/>
      </div>

    </div>
  )
}
