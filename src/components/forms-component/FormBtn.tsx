import React from 'react'

const FormBtn = ({ text, disabled }: { text: string; disabled?: boolean }) => {
  return (
    <>
      <button
        type="submit"
        disabled={disabled}
        className={`cursor-pointer mt-3 py-3 px-5 bg-primary text-white rounded-lg transition-opacity duration-200 ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
      >
        {text}
      </button>
    </>
  )
}

export default FormBtn