


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
import { LinearProgress } from "@mui/material";

const LoginForm = ( { logoClass }: LoginFormProp) => {
  const navigate = useNavigate();
  const [isOTP, setIsOTP] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true)
      if (isOTP) {
        // Send OTP API call
        const requestData = {
          Email: values.email, // Email field from the form
        };
        const response = await sendOTP(requestData);
        setIsLoading(false)
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
          setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  };

  return (
    <div>
      <div className="login-main">
      <CommonLogo logoClass={logoClass} />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="theme-form">
              <H3>{"Login to your account"}</H3>
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
              <div>
              
              </div>
              <div className="text-end mt-3">
                {
                  isLoading && 
                  <div className={'mb-3'}>
                    <LinearProgress/>
                  </div>
                }
                
                <Btn color="primary" block className="w-100" disabled={isSubmitting}>
                  {isOTP ? "Send OTP" : "Verify OTP"}
                </Btn>
              </div>
              <div className="mt-3">
                  By continuing, I agree with your <Link to={'/terms'}><u>Terms of Service</u></Link> , <Link to={'/privacypolicy'}><u>Privacy Policy</u>.</Link> & <Link to={'/refundpolicy'}><u>Refund Policy</u>.</Link>
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


