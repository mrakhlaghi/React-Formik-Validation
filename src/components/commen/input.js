const Input = ({name, label ,formik , type="text"}) => {
    return (<div className="formControl">
    <label htmlFor={name}> {label}</label>
    <input
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