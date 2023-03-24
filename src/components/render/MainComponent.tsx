import React, { useState } from 'react'
import A from './A';


const Main= ()=> {
    const [value,setValue]=useState(0)
  return (
   <div>
     <button onClick={()=> setValue(value +1)}>Main click</button>
     <A/>
    
   </div>
  )
}
export default Main;