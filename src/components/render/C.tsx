import React, { memo, useState } from 'react'

const C= ()=> {
    const [value,setValue]=useState(0)
    console.log("C is rendered..")
  return (
    <button onClick={()=> setValue(value +1)}> C click</button>
  )
}
export default memo(C);