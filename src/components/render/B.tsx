import React, { useState } from 'react'
import C from './C'

const B= ()=> {
    const [value,setValue]=useState(0)
    console.log("B is rendered..")
  return (
   <div>
     <button onClick={()=> setValue(value +1)}>B click</button>
     <C/>
   </div>
  )
}
export default B;