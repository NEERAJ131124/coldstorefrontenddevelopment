import React from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Footer from "../../../../../Layout/Footer";
import AuthHeader from "../../../../../Layout/AuthHeader/Index";
import { Btn, H3 } from "../../../../../AbstractElements";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitContactUs } from "../../../../../api-service/Auth/Index";

const ContactUs: React.FC = () => {
  const validationSchema = Yup.object({
    Name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .required("Name is required"),
    Email: Yup.string().email("Invalid email address").required("Email is required"),
    Phone: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Phone number must be valid")
      .required("Phone number is required"),
    Query: Yup.string()
      .min(10, "Query must be at least 10 characters long")
      .required("Query is required"),
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Phone: "",
      Query: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await submitContactUs(values);
        if (response!=null) {
          toast.success("Query received! We’ll reach out to you soon.");
          resetForm();
        } else {
          toast.warning("There was an error submitting your query. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.warning("There was an error submitting your query. Please try again.");
      }
    },
  });

  return (
    <>
      <AuthHeader />
      <div className="contact-us-section">
        <Container className="my-5">
          <H3 className="text-center mb-4" style={{ fontWeight: "bold", color: "#308e87" }}>
            We'd Love to Hear from You!
          </H3>
          <Row className="gy-4">
            {/* Contact Form */}
            <Col lg={6} className="login-main">
              <div className="form-container p-4" style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                <h2 className="section-title mb-4 text-center" style={{ color: "#308e87", fontWeight: "bold" }}>
                  Get in Touch
                </h2>
                <Form onSubmit={formik.handleSubmit}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="Name"
                      id="Name"
                      value={formik.values.Name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your full name"
                      className={formik.touched.Name && formik.errors.Name ? "is-invalid" : ""}
                    />
                    {formik.touched.Name && formik.errors.Name && (
                      <div className="invalid-feedback">{formik.errors.Name}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="Email"
                      id="Email"
                      value={formik.values.Email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your email address"
                      className={formik.touched.Email && formik.errors.Email ? "is-invalid" : ""}
                    />
                    {formik.touched.Email && formik.errors.Email && (
                      <div className="invalid-feedback">{formik.errors.Email}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone Number</Label>
                    <Input
                      type="tel"
                      name="Phone"
                      id="Phone"
                      value={formik.values.Phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your phone number"
                      className={formik.touched.Phone && formik.errors.Phone ? "is-invalid" : ""}
                    />
                    {formik.touched.Phone && formik.errors.Phone && (
                      <div className="invalid-feedback">{formik.errors.Phone}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="query">Your Query</Label>
                    <Input
                      type="textarea"
                      name="Query"
                      id="Query"
                      value={formik.values.Query}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Describe your query"
                      className={formik.touched.Query && formik.errors.Query ? "is-invalid" : ""}
                    />
                    {formik.touched.Query && formik.errors.Query && (
                      <div className="invalid-feedback">{formik.errors.Query}</div>
                    )}
                  </FormGroup>
                  <div className="text-end">
                    <Btn
                      type="submit"
                      color="primary"
                      className="submit-button"
                      disabled={formik.isSubmitting}
                    >
                      Submit
                    </Btn>
                  </div>
                </Form>
              </div>
            </Col>

            {/* Contact Info Section */}
            <Col lg={6}>
  
              <div className="info-container">
                <Row><Col sm={12} className="mb-3">
                 <div
                       className="info-box d-flex align-items-center"
                      style={{
                        background: "#F1F8E9",
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      <FaMapMarkerAlt size={40} color="#308e87" />
                      <div className="ms-3">
                        <H3 className="mb-0">Location</H3>
                        <p className="mb-0">Kb1802, Salarpuria Greenage, Bangalore, Karnataka, India</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={12} className="mb-3">
                    <div
                      className="info-box d-flex align-items-center"
                      style={{
                        background: "#E8F5E9",
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      <FaPhoneAlt size={40} color="#308e87" />
                      <div className="ms-3">
                        <H3 className="mb-0">Phone</H3>
                        <p className="mb-0">+91-9876543210</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={12}>
                    <div
                      className="info-box d-flex align-items-center"
                      style={{
                        background: "#F1F8E9",
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      <FaEnvelope size={40} color="#308e87" />
                      <div className="ms-3">
                        <H3 className="mb-0">Email</H3>
                        <p className="mb-0">
                          <a href="mailto:amanwaliaus@gmail.com" style={{ textDecoration: "none", color: "#308e87" }}>
                            amanwaliaus@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          {/* Map Section */}
          <Row className="mt-5">
            <Col>
              <div
                className="map-container"
                style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
              >
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.455267827898!2d77.64751937587141!3d12.908136986091604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14092660f3a9%3A0x23f98fcf5ef53ea4!2sSalarpuria%20Greenage!5e0!3m2!1sen!2sin!4v1702723999999!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: "0" }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;








// import React, { useState } from "react";
// import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import Footer from "../../../../../Layout/Footer";
// import AuthHeader from "../../../../../Layout/AuthHeader/Index";
// import { Btn, H3 } from "../../../../../AbstractElements";
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { submitContactUs } from "../../../../../api-service/Auth/Index";

// const ContactUs: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     query: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await submitContactUs(formData)
//       if (response.success) {
//         toast.success("Your query has been submitted successfully!");
//       } else {
//         toast.warning("There was an error submitting your query. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.warning("There was an error submitting your query. Please try again.");
//     }
//   };

//   return (
//     <>
//       <AuthHeader />
//       <div className="contact-us-section">
//         <Container className="my-5">
//           <H3 className="text-center mb-4" style={{ fontWeight: "bold", color: "#308e87" }}>
//             We'd Love to Hear from You!
//           </H3>
//           <Row className="gy-4">
//             {/* Contact Form */}
//             <Col lg={6} className="login-main">
//               <div className="form-container p-4" style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
//                 <h2 className="section-title mb-4 text-center" style={{ color: "#308e87", fontWeight: "bold" }}>
//                   Get in Touch
//                 </h2>
//                 <Form onSubmit={handleSubmit}>
//                   <FormGroup>
//                     <Label for="name">Name</Label>
//                     <Input
//                       type="text"
//                       name="name"
//                       id="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <Label for="email">Email</Label>
//                     <Input
//                       type="email"
//                       name="email"
//                       id="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Enter your email address"
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <Label for="phone">Phone Number</Label>
//                     <Input
//                       type="tel"
//                       name="phone"
//                       id="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="Enter your phone number"
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <Label for="query">Your Query</Label>
//                     <Input
//                       type="textarea"
//                       name="query"
//                       id="query"
//                       value={formData.query}
//                       onChange={handleChange}
//                       placeholder="Describe your query"
//                       required
//                     />
//                   </FormGroup>
//                   <div className="text-end">
//                     <Btn type="submit" style={{backgroundColor:"#308e87",}} className="submit-button">
//                       Submit
//                     </Btn>
//                   </div>
//                 </Form>
//               </div>
//             </Col>

//             <Col lg={6}>
//               <div className="info-container">
//                 <Row>
//                   <Col sm={12} className="mb-3">
//                     <div
//                       className="info-box d-flex align-items-center"
//                       style={{
//                         background: "#F1F8E9",
//                         borderRadius: "10px",
//                         padding: "20px",
//                         boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//                       }}
//                     >
//                       <FaMapMarkerAlt size={40} color="#308e87" />
//                       <div className="ms-3">
//                         <H3 className="mb-0">Location</H3>
//                         <p className="mb-0">Kb1802, Salarpuria Greenage, Bangalore, Karnataka, India</p>
//                       </div>
//                     </div>
//                   </Col>
//                   <Col sm={12} className="mb-3">
//                     <div
//                       className="info-box d-flex align-items-center"
//                       style={{
//                         background: "#E8F5E9",
//                         borderRadius: "10px",
//                         padding: "20px",
//                         boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//                       }}
//                     >
//                       <FaPhoneAlt size={40} color="#308e87" />
//                       <div className="ms-3">
//                         <H3 className="mb-0">Phone</H3>
//                         <p className="mb-0">+91-9876543210</p>
//                       </div>
//                     </div>
//                   </Col>
//                   <Col sm={12}>
//                     <div
//                       className="info-box d-flex align-items-center"
//                       style={{
//                         background: "#F1F8E9",
//                         borderRadius: "10px",
//                         padding: "20px",
//                         boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//                       }}
//                     >
//                       <FaEnvelope size={40} color="#308e87" />
//                       <div className="ms-3">
//                         <H3 className="mb-0">Email</H3>
//                         <p className="mb-0">
//                           <a href="mailto:amanwaliaus@gmail.com" style={{ textDecoration: "none", color: "#308e87" }}>
//                             amanwaliaus@gmail.com
//                           </a>
//                         </p>
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>
//               </div>
//             </Col>
//           </Row>

//           {/* Map Section */}
//           <Row className="mt-5">
//             <Col>
//               <div
//                 className="map-container"
//                 style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
//               >
//                 <iframe
//                   title="Google Map"
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.455267827898!2d77.64751937587141!3d12.908136986091604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14092660f3a9%3A0x23f98fcf5ef53ea4!2sSalarpuria%20Greenage!5e0!3m2!1sen!2sin!4v1702723999999!5m2!1sen!2sin"
//                   width="100%"
//                   height="400"
//                   style={{ border: "0" }}
//                   allowFullScreen
//                   loading="lazy"
//                 ></iframe>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ContactUs;

