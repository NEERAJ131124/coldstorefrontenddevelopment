import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Btn, H3, P } from "../../../../../AbstractElements";
import { Link, useNavigate } from "react-router-dom";
import CommonLogo from "./CommonLogo";
import { FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import {
  sendSignUpOTP,
  submitSignUp
} from "../../../../../api-service/Auth/Index";
import { LoginFormProp } from "../../../../../Types/Others.type";
import { LinearProgress } from "@mui/material";

const SignUpForm = ({ logoClass }: LoginFormProp) => {
  const navigate = useNavigate();
  const [isOTP, setIsOTP] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  // const [isEmailVerified, setIsEmailVerified] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    emailOtp: "",
    mobileOtp: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[6-9][0-9]{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    emailOtp: isOTP
      ? Yup.string()
      : Yup.string()
          .required("Email OTP is required")
          .matches(/^\d{6}$/, "Email OTP must be exactly 6 digits"),
    mobileOtp: isOTP
      ? Yup.string()
      : Yup.string()
          .required("Mobile OTP is required")
          .matches(/^\d{6}$/, "Mobile OTP must be exactly 6 digits"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true)
    try {
      if (isOTP) {
        const requestData = { Email: values.email, Mobile: values.mobile };
        const response = await sendSignUpOTP(requestData);
        if (response) {
          toast.success("OTP sent successfully!");
          setIsOTP(false);
        }
      } 
      else {
       const data ={
          Email: values.email,
          PhoneNumber: values.mobile,
          FirstName: values.firstName,
          LastName: values.lastName,
          EmailOtp: values.emailOtp,
          PhoneOtp:  values.mobileOtp,
        };
        console.log(data)
        const response=await submitSignUp(data, navigate);
        if(response?.data?.success){
          toast.success(response.data.message);
          navigate("/login");
        }
        else{
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false)
  };

  const resendSignUpOTP = async () => {
    setIsOTP(true)
    // const requestData = { Email: verifyData.Email, Mobile: verifyData.PhoneNumber };
    // await sendSignUpOTP(requestData);
    // toast.success("OTP resent successfully!");
  };

  // const verifyMobile = async (value: string) => {
  //   if (value.length === 6) {
  //     const request = {
  //       PhoneNumber: verifyData.PhoneNumber,
  //       PhoneOtp: value,
  //     };
  //     try {
  //       const response = await verifyMobileOTP(request, navigate);
  //       if (response.success) {
  //         setIsPhoneVerified(true);
  //         toast.success(response.message);
  //       } else {
  //         setIsPhoneVerified(false);
  //       }
  //     } catch (error) {
  //       console.error("Mobile OTP Verification Failed:", error);
  //       setIsPhoneVerified(false);
  //     }
  //   } else {
  //     setIsPhoneVerified(false);
  //   }
  // };

  // const verifyEmail = async (value: string) => {
  //   if (value.length === 6) {
  //     const request = {
  //       Email: verifyData.Email,
  //       EmailOtp: value,
  //     };
  //     try {
  //       const response = await verifyEmailOTP(request, navigate);
  //       if (response.success) {
  //         setIsEmailVerified(true);
  //         toast.success(response.message);
  //       } else {
  //         setIsEmailVerified(false);
  //       }
  //     } catch (error) {
  //       console.error("Email OTP Verification Failed:", error);
  //       setIsEmailVerified(false);
  //     }
  //   } else {
  //     setIsEmailVerified(false);
  //   }
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/\D/g, "").slice(0, maxLength); // Only digits and max length
    e.target.value = filteredValue; // Update the input value
  };

  return (
    <div>
      <div className="login-main">
        <CommonLogo />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, handleChange }) => (
            <Form>
              <H3>Create a New Account</H3>
              <P>Complete the form to sign up</P>
              {isOTP && (
                <>
                  <FormGroup>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="form-control"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="form-control"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      type="text"
                      name="mobile"
                      placeholder="Mobile Number"
                      className="form-control"
                      maxLength={10}
                      onChange={(e:any) => {
                        handleInputChange(e, 10);
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage name="mobile" component="div" className="text-danger" />
                  </FormGroup>
                </>
              )}
              {!isOTP && (
                <>
                  <FormGroup>
                    <Field
                      type="text"
                      name="emailOtp"
                      placeholder="Enter Email OTP"
                      className="form-control"
                      maxLength={6}
                      onChange={(e:any) => {
                        handleInputChange(e, 6);
                        handleChange(e);
                        // verifyEmail(e.target.value);
                      }}
                    />
                    <ErrorMessage name="emailOtp" component="div" className="text-danger" />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      type="text"
                      name="mobileOtp"
                      placeholder="Enter Mobile OTP"
                      className="form-control"
                      maxLength={6}
                      onChange={(e:any) => {
                        handleInputChange(e, 6);
                        handleChange(e);
                        // verifyMobile(e.target.value);
                      }}
                    />
                    <ErrorMessage name="mobileOtp" component="div" className="text-danger" />
                  </FormGroup>
                </>
              )}
              <div className="mt-3 text-center">
                {isLoading && <LinearProgress />}
              </div>
              <div className="text-end mt-3 d-flex">
                {!isOTP && (
                  <Btn
                    color="primary"
                    block
                    className="w-100 me-3"
                    type="button"
                    onClick={resendSignUpOTP}
                    disabled={isSubmitting}
                  >
                    Back
                  </Btn>
                )}
                {isOTP ? (
                  <Btn color="primary" block className="w-100" type="submit" disabled={isSubmitting}>
                    Send OTP
                  </Btn>
                ) : (
                  <Btn
                    color="primary"
                    block
                    className="w-100"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Btn>
                )}
              </div>
              <div className="mt-3" >
                By continuing, I agree with your <Link to={'/terms'}><u>Terms of Service</u></Link> , <Link to={'/privacypolicy'}><u>Privacy Policy</u>.</Link> & <Link to={'/refundpolicy'}><u>Refund Policy</u>.</Link>
              </div>
              <div className="mt-3 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;




















// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Btn, H3, P } from "../../../../../AbstractElements";
// import { Link, useNavigate } from "react-router-dom";
// import CommonLogo from "./CommonLogo";
// import { FormGroup } from "reactstrap";
// import { toast } from "react-toastify";
// import { sendOTP, sendSignUpOTP, submitSignUp, verifyEmailOTP, verifyMobileOTP, verifyOTP } from "../../../../../api-service/Auth/Index";
// import { LoginFormProp } from "../../../../../Types/Others.type";
// import { PhoneNumber } from "../../../../../Utils/Constants";

// const SignUpForm = ({ logoClass }: LoginFormProp) => {
//     const navigate = useNavigate();
//     const [isOTP, setIsOTP] = useState(true);
//     const [IsPhoneVerified, setIsPhoneVerified] = useState(false);
//     const [IsEmailVerified, setIsEmailVerified] = useState(false);


//     const [verifyData, setVerifyData] = useState({
//         Email: "",
//         PhoneNumber: "",
//         FirstName: "",
//         LastName: "",
//     });

//     const initialValues = {
//         firstName: "",
//         lastName: "",
//         email: "",
//         mobile: "",
//         emailOtp: "",
//         mobileOtp: "",
//     };

//     const validationSchema = Yup.object({
//         firstName: Yup.string().required("First Name is required"),
//         lastName: Yup.string().required("Last Name is required"),
//         email: Yup.string()
//             .email("Invalid email format")
//             .required("Email is required"),
//         mobile: Yup.string()
//             .matches(/^[6-9][0-9]{9}$/, "Invalid mobile number")
//             .required("Mobile number is required"),
//             emailOtp: isOTP 
//             ? Yup.string() 
//             : Yup.string()
//                   .required("Email OTP is required")
//                   .matches(/^\d{6}$/, "Email OTP must be exactly 6 digits"),
//         mobileOtp: isOTP 
//             ? Yup.string() 
//             : Yup.string()
//                   .required("Mobile OTP is required")
//                   .matches(/^\d{6}$/, "Mobile OTP must be exactly 6 digits"),
//     });

//     const handleSubmit = async (values: typeof initialValues) => {
//         try {
//             debugger;
//             if (isOTP) {
//                 const requestData = { Email: values.email, Mobile: values.mobile };
//                 const response = await sendSignUpOTP(requestData);
//                 if (response != null) {
//                     toast.success("OTP sent successfully!");
//                     setIsOTP(false);
//                 }
//                 setVerifyData({
//                     ...verifyData,
//                     Email: values.email,
//                     PhoneNumber: values.mobile,
//                     FirstName: values.firstName,
//                     LastName: values.lastName,
//                 });
//             } else {
//                 await submitSignUp(verifyData, navigate);
//                 toast.success("Account created successfully!");
//                 navigate("/login");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             // toast.error("Something went wrong!");
//         }
//     };

//     const resendSignUpOTP = async () => {
//         const requestData = { Email: verifyData.Email, Mobile: verifyData.PhoneNumber };
//         console.log(requestData)
//         await sendSignUpOTP(requestData);
//         // toast.success("OTP resent successfully!");
//     };


//     const verifyMobile = async (value: string) => {
//         debugger;
//         if (value.length === 6) {
//             const request = {
//                 PhoneNumber: verifyData.PhoneNumber,
//                 PhoneOtp: value,
//             };
//             try {
//                 const response = await verifyMobileOTP(request, navigate);
//                 if (response.success) {
//                     setIsPhoneVerified(true)
//                     toast.success(response.message)
//                 }
//                 else {
//                     setIsPhoneVerified(false)
//                 }
//             } catch (error) {
//                 console.error("Mobile OTP Verification Failed:", error);
//                 setIsPhoneVerified(false)
//             }
//         }
//         else{
//             setIsPhoneVerified(false)
//         }
//     };

//     const verifyEmail = async (value: string) => {
//         debugger;
//         if (value.length === 6) {
//             const request = {
//                 Email: verifyData.Email,
//                 EmailOtp: value,
//             };
//             try {
//                 const response = await verifyEmailOTP(request, navigate);
//                 if (response.success) {
//                     setIsEmailVerified(true)
//                     toast.success(response.message)
//                 }
//                 else {
//                     setIsEmailVerified(false)
//                 }
//             } catch (error) {
//                 console.error("Email OTP Verification Failed:", error);
//                 setIsEmailVerified(false)
//             }
//         }
//         else{
//             setIsEmailVerified(false)
//         }
//     };

//     return (
//         <div>
//             <div className="login-main">
//                 <CommonLogo />
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
//                     {({ isSubmitting, setFieldValue, handleChange }) => (
//                         <Form>
//                             <H3>{"Create a New Account"}</H3>
//                             <P>{"Complete the form to sign up"}</P>
//                             {isOTP && (
//                                 <>
//                                     <FormGroup>
//                                         <Field type="text" name="firstName" placeholder="First Name" className="form-control" />
//                                         <ErrorMessage name="firstName" component="div" className="text-danger" />
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Field type="text" name="lastName" placeholder="Last Name" className="form-control" />
//                                         <ErrorMessage name="lastName" component="div" className="text-danger" />
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Field type="text" name="email" placeholder="Email" className="form-control" />
//                                         <ErrorMessage name="email" component="div" className="text-danger" />
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Field type="text" name="mobile" placeholder="Mobile Number" className="form-control" />
//                                         <ErrorMessage name="mobile" component="div" className="text-danger" />
//                                     </FormGroup>
//                                 </>
//                             )}
//                             {!isOTP && (
//                                 <>
//                                     <FormGroup>
//                                         <Field
//                                             type="text"
//                                             name="emailOtp"
//                                             placeholder="Enter Email OTP"
//                                             className="form-control"
//                                             onChange={(e: any) => {
//                                                 handleChange(e);
//                                                 verifyEmail(e.target.value);
//                                             }}
//                                         />
//                                         <ErrorMessage name="emailOtp" component="div" className="text-danger" />
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Field
//                                             type="text"
//                                             name="mobileOtp"
//                                             placeholder="Enter Mobile OTP"
//                                             className="form-control"
//                                             onChange={(e: any) => {
//                                                 handleChange(e);
//                                                 verifyMobile(e.target.value);
//                                             }}
//                                         />
                                        
//                                         <ErrorMessage name="mobileOtp" component="div" className="text-danger" />
//                                     </FormGroup>
//                                 </>
//                             )}
//                             <div className="text-end mt-3 d-flex">
//                                 {!isOTP && (
//                                     <Btn
//                                         color="primary"
//                                         block
//                                         className="w-100 me-3"
//                                         type="button"
//                                         onClick={resendSignUpOTP}
//                                         disabled={isSubmitting}
//                                     >
//                                         Resend
//                                     </Btn>
//                                 )}
//                                 {
//                                     isOTP ? <Btn color="primary" block className="w-100" type="submit" disabled={isSubmitting}>
//                                         Send OTP
//                                     </Btn> : <Btn color="primary" block className="w-100" type="submit" disabled={isSubmitting || !IsEmailVerified && !IsPhoneVerified}>
//                                         Sign Up
//                                     </Btn>
//                                 }

//                             </div>
//                             <div className="mt-3 text-center">
//                                 Already have an account? <Link to="/login">Login</Link>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// };

// export default SignUpForm;

