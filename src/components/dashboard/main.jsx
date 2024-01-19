import React from 'react'
import Base from './main_base'
export default function Main(user_id) {
  
  return (
    <div>
    <h1 className='text-2xl  text-[#37517E] font-bold py-6'>All Time Report</h1>
      
      <div className=''><Base  user_id={user_id.user_id}/></div>
      
    </div>
  )
}
