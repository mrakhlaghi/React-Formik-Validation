import { useEffect } from "react";
import { createRef } from "react";

const Input = ({name, label ,formik , type="text" }) => {
  let inputRef =createRef()
  
  useEffect(()=>{
    inputRef.current.focus()
  },[])
    
    
    return (<div className="formControl">
    <label htmlFor={name}> {label}</label>
    <input
       ref={inputRef}
      type={type}
      name={name}
      id={name}
      {...formik.getFieldProps(name)}
      // value={formik.values.name}
      // onBlur={formik.handleBlur}
      // onChange={formik.handleChange}
    />

    {formik.errors[name] && formik.touched[name] && (
      <div className="error">{formik.errors[name]}</div>
    )}
  </div> );
}
 
export default Input;