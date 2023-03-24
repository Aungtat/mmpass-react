import React, { useState } from 'react'
import B from './B'

const A= ()=> {
    const [value,setValue]=useState(0)
    console.log("A is rendered..")
  return (
   <div>
     <button onClick={()=> setValue(value +1)}>A click</button>
     <B/>
   </div>
  )
}
export default A;