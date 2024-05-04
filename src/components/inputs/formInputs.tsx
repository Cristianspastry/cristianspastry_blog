import { ChangeEventHandler } from "react";

const FormInput = ({ label, type , value, handleChange } : { label: string, type: string, value: string, handleChange:  ChangeEventHandler<HTMLInputElement> | undefined }) => {
    return (
      <div className="mb-4">
        <label htmlFor={label}  className="block text-gray-700">{label}</label>
        <input required type={type} value={value} onChange={handleChange} id={label} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
      </div>
    );
  };

  export default FormInput;