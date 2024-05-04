



import React from 'react'

type Props = {}

const FormCheckBox = (props: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor="remember" className="flex items-center">
        <input type="checkbox" id="remember" className="mr-2" />
        Ricordami
      </label>
    </div>
  )
}

export default FormCheckBox