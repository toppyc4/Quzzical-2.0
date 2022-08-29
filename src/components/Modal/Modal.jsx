import React from "react"

export const Modal = ({ children }) => {
  return (
    <div className='absolute m-auto bg-white h-full lg:max-h-[600px] max-w-[500px] z-50 p-8'>
      <div className='felx flex-col justify-between items-center gap-y-8'>
        {children}
      </div>
    </div>
  )
}