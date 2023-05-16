import axios from "axios";
import { useFormik } from "formik";
import { createRef, useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "./commen/input";

// 1.
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  gender: "",
};
// 2.
const onSubmit = (values) => {
  // console.log(values);
};
// 3.
// const validate = (values) => {
//   let errors = {};
//   if (!values.name) {
//     errors.name = " name is required";
//   }
//   if (!values.email) {
//     errors.email = " email is required";
//   }
//   if (!values.password) {
//     errors.password = " password is required";
//   }
//   if (!values.phoneNumber) {
//     errors.phoneNumber = " phoneNumber is required";
//   }
//   return errors;
// };
// 4.
const validationSchema = Yup.object({
  name: Yup.string()
    .required(" name is required")
    .min(8, "name length is require at least 8 character "),
  email: Yup.string()
    .email("invalid email format")
    .required(" email is required"),
  password: Yup.string()
    .required(" password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required(" password is required")
    .oneOf([Yup.ref("password"), null], "passwords not matches"),
  phoneNumber: Yup.string()
    .required(" phoneNumber is required")
    .matches(/^[0-9]{11}$/, "invalid phone number")
    .nullable(true),
  gender: Yup.string().required(" gender is required"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);
  
  const formik = useFormik({
    initialValues: formValues || initialValues,
    enableReinitialize: true,
    // get permission formik to load new data if we had previous data
    onSubmit,
    validationSchema,
    validateOnMount: true,
    // start validation from start onMounting
  });

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        let user = res.data;
        setFormValues(user);
      })
      .catch((err) => console.log(err));
      

  }, []);

  // console.log(formik.errors);

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        {/* <div className="formControl">
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            name="name"
            id="name"
            {...formik.getFieldProps("name")}
            // value={formik.values.name}
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
          />

          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div> */}
        <Input formik={formik} name="name" label="Name"  />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="password" label="Password" />
        <Input formik={formik} name="confirmPassword" label="ConfirmPassword" />
        <Input formik={formik} name="phoneNumber" label="PhoneNumber" />
        {/* <div className="formControl">
          <label htmlFor="email"> Email</label>
          <input
            type="text"
            {...formik.getFieldProps("email")}
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label htmlFor="phoneNumber"> Phone Number</label>
          <input
            type="text"
            maxLength="11"
            {...formik.getFieldProps("phoneNumber")}
            name="phoneNumber"
            id="phoneNumber"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="formControl">
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            {...formik.getFieldProps("password")}
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>

        <div className="formControl">
          <label htmlFor="confirmPassword"> Confirm Password</label>
          <input
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            name="confirmPassword"
            id="confirmPassword"
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
        </div> */}
        <div className="formControl">
          <input
            type="radio"
            id="0"
            value="0"
            name="gender"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="0">Male</label>
          <input
            type="radio"
            id="1"
            value="1"
            name="gender"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
          <label htmlFor="1">Male</label>
          {formik.errors.gender && formik.touched.gender && (
            <div className="error">{formik.errors.gender}</div>
          )}
        </div>

        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
