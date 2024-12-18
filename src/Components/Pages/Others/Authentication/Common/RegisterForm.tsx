import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Btn, H3, P } from "../../../../../AbstractElements";
import { Link, useNavigate } from "react-router-dom";
import CommonLogo from "./CommonLogo";
import { FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { sendOTP, sendSignUpOTP, verifyOTP, verifySignUpOTP } from "../../../../../api-service/Auth/Index";
import { LoginFormProp } from "../../../../../Types/Others.type";

const SignUpForm = ({logoClass}:LoginFormProp) => {
  const navigate = useNavigate();
  const [isOTP, setIsOTP] = useState(true);
   
  const requestData = { Email: "", Mobile: "" };
  
  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    emailOtp: "",
    mobileOtp: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[6-9][0-9]{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    emailOtp: isOTP ? Yup.string() : Yup.string().required("Email OTP is required"),
    mobileOtp: isOTP ? Yup.string() : Yup.string().required("Mobile OTP is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
        debugger;
      if (isOTP) {
        // Send OTP for email and mobile
        const requestData = { Email: values.email, Mobile: values.mobile };
        requestData.Email = values.email;
        requestData.Mobile = values.mobile;
        await sendSignUpOTP(requestData);
        toast.success("OTP sent successfully!");
        setIsOTP(false); // Show OTP fields
      } else {
        // Verify OTP and complete sign-up
        const verifyData = {
          Email: values.email,
          Mobile: values.mobile,
          EmailOTP: values.emailOtp,
          MobileOTP: values.mobileOtp,
          FirstName: values.firstName,
          LastName: values.lastName,
        };
        
        await verifySignUpOTP(verifyData,navigate);
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const resendSignUpOTP=async ()=>{
      await sendSignUpOTP(requestData);
  }

  return (
    <div>
      <CommonLogo />
      <div className="login-main">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <H3>{"Create a New Account"}</H3>
              <P>{"Complete the form to sign up"}</P>
              {
                isOTP && 
                <>
                   <FormGroup>
                <Field type="text" name="firstName" placeholder="First Name" className="form-control" />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </FormGroup>
              <FormGroup>
                <Field type="text" name="lastName" placeholder="Last Name" className="form-control" />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </FormGroup>
              <FormGroup>
                <Field type="text" name="email" placeholder="Email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </FormGroup>
              <FormGroup>
                <Field type="text" name="mobile" placeholder="Mobile Number" className="form-control" />
                <ErrorMessage name="mobile" component="div" className="text-danger" />
              </FormGroup>
                
                </>
              }
              {!isOTP && (
                <>
                  <FormGroup>
                    <Field type="text" name="emailOtp" placeholder="Enter Email OTP" className="form-control" />
                    <ErrorMessage name="emailOtp" component="div" className="text-danger" />
                  </FormGroup>
                  <FormGroup>
                    <Field type="text" name="mobileOtp" placeholder="Enter Mobile OTP" className="form-control" />
                    <ErrorMessage name="mobileOtp" component="div" className="text-danger" />
                  </FormGroup>
                </>
              )}

              <div className="text-end mt-3 d-flex">
                {
                    !isOTP &&  <Btn color="primary" block className="w-100 me-3" type="button" onClick={()=>resendSignUpOTP} disabled={isSubmitting}>
                    Resend
                  </Btn>
                }
             
                <Btn color="primary" block className="w-100" type="submit" disabled={isSubmitting}>
                  {isOTP ? "Send OTP" : "Sign Up"}
                </Btn>
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
