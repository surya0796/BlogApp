import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <main className='app'>
        <Outlet/>
    </main>
  )
}

export default HomeLayout