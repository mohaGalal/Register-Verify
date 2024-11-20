import React from 'react'
import Header from '../../../shared/components/header/Header'

export default function Dashboard({loginData}) {
  return (
    <>
    <Header title={`welcome ${loginData?.userName}`} 
    description={'This is a welcoming screen for the entry of the application , you can now see the options'}/>
    <div>Dashboard</div>
    </>
    
  )
}
