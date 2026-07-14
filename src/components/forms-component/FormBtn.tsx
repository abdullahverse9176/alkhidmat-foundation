import React from 'react'

const FormBtn = ({text}: {text: string}) => {
  return (
    <>
        <button type='submit' className='cursor-pointer mt-3 py-3 px-5 bg-primary text-white rounded-lg'>{text}</button>
    </>
  )
}

export default FormBtn