


import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Btn, H2, H3, P } from "../../../../../AbstractElements";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormProp } from '../../../../../Types/Others.type';
import CommonLogo from "./CommonLogo";
import { FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { sendOTP, verifyOTP } from "../../../../../api-service/Auth/Index";

const LoginForm = ( { logoClass }: LoginFormProp) => {
  const navigate = useNavigate();
  const [isOTP, setIsOTP] = useState(true);

  // Initial form values
  const initialValues = {
    email: "",
    otp: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email / Mobile Number is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^[0-9]{10}$/,
        "Must be a valid email or 10-digit mobile number"
      )
  });
  
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      debugger;
      if (isOTP) {
        // Send OTP API call
        const requestData = {
          Email: values.email, // Email field from the form
        };
        const response = await sendOTP(requestData);
        toast.success("OTP sent successfully!");
        setIsOTP(false); // Show OTP field after sending OTP
      } 
      else {
        // Verify OTP API call
        const requestData = {
          Email: values.email, // Email field from the form
          Otp: values.otp, // OTP field from the form
        };
       await verifyOTP(requestData,navigate);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <CommonLogo logoClass={logoClass} />
      <div className="login-main">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="theme-form">
              <H3>{"Sign In to Your Account"}</H3>
              <P>{"Using OTP"}</P>
              <FormGroup>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email / Mobile Number"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </FormGroup>
              {!isOTP && (
                <FormGroup>
                  <Field
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="form-control"
                  />
                  <ErrorMessage name="otp" component="div" className="text-danger" />
                </FormGroup>
              )}  
              <div className="text-end mt-3">
                <Btn color="primary" block className="w-100" disabled={isSubmitting}>
                  {isOTP ? "Send OTP" : "Verify OTP"}
                </Btn>
           
              </div>
              <div className="mt-3" >
              I agree with your  <Link to={'/terms'}><u>Terms of Service</u></Link> & <Link to={'/privacypolicy'}><u>Privacy Policy</u></Link>
                </div>
                <div className="mt-3 text-center">
                                Don't have an account? <Link to="/register">Register</Link>
                              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;



















// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Btn, H2, H3, P } from "../../../../../AbstractElements";
// import { useNavigate } from "react-router-dom";
// import { LoginFormProp } from '../../../../../Types/Others.type';
// import CommonLogo from "./CommonLogo";
// import { FormGroup } from "reactstrap";
// import { toast } from "react-toastify";
// import { sendOTP, verifyOTP } from "../../../../../api-service/Auth/Index";

// const LoginForm = ( { logoClass }: LoginFormProp) => {
//   const navigate = useNavigate();
//   const [isOTP, setIsOTP] = useState(true);

//   // Initial form values
//   const initialValues = {
//     email: "",
//     mobile:"",
//     mobileOtp:"",
//     emailOtp: "",
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email format") // Validates proper email format
//       .required("Email is required"), // Ensures email is not empty
//     mobile: Yup.string()
//       .matches(/^[6-9][0-9]{9}$/, "Mobile number must be a valid Indian number.") // Validates the 10-digit mobile number starting with 6-9
//       .required("Mobile number is required"), // Ensures mobile is not empty
//   });
  

//   const handleSubmit = async (values: typeof initialValues) => {
//     try {
//       debugger;
//       if (isOTP) {
//         const requestData = {
//           Email: values.email,
//           Mobile: values.mobile,
//         };
//         const response = await sendOTP(requestData);
//         toast.success("OTP sent successfully!");
//         setIsOTP(false); 
//       } 
//       else {
//         const requestData = {
//           Email: values.email, 
//           Mobile: values.mobile, 
//           MobileOTP: values.mobileOtp,
//           EmailOTP:values.emailOtp
//         };
//        await verifyOTP(requestData,navigate);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   return (
//     <div>
//       <CommonLogo logoClass={logoClass} />
//       <div className="login-main">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="theme-form">
//               <H3>{"Sign In / Sign Up to Your Account"}</H3>
//               <P>{"Using OTP"}</P>
//               <FormGroup>
//                 <Field
//                   type="text"
//                   name="email"
//                   placeholder="Email / Mobile Number"
//                   className="form-control"
//                 />
//                 <ErrorMessage name="email" component="div" className="text-danger" />
//               </FormGroup>
//               {!isOTP && (
//                 <>
//                  <FormGroup>
//                   <Field
//                     type="text"
//                     name="emailOtp"
//                     placeholder="Enter Email OTP"
//                     className="form-control"
//                   />
//                   <ErrorMessage name="emailOtp" component="div" className="text-danger" />
//                 </FormGroup>
//                 <FormGroup>
//                   <Field
//                     type="text"
//                     name="mobileOtp"
//                     placeholder="Enter Mobile OTP"
//                     className="form-control"
//                   />
//                   <ErrorMessage name="mobileOtp" component="div" className="text-danger" />
//                 </FormGroup>
//                 </>
//               )}  
//               <div className="text-end mt-3">
//                 <Btn color="primary" block className="w-100" disabled={isSubmitting}>
//                   {isOTP ? "Send OTP" : "Verify OTP"}
//                 </Btn>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

