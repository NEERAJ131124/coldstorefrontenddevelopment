
import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import Footer from "../../../../../Layout/Footer";
import AuthHeader from "../../../../../Layout/AuthHeader/Index";
import { dynamicImage } from "../../../../../Utils";
import { H3 } from "../../../../../AbstractElements";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Your query has been submitted successfully!");
      } else {
        alert("There was an error submitting your query. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your query. Please try again.");
    }
  };

  return (
    <>
      <AuthHeader />
      <div className="contact-us-section">
        <Container className="my-4">
          <Row className="gy-4">
            {/* Contact Form */}
            <Col sm={6} className="login-main"
              style={{
                backgroundColor: "#e6ffe6",
                padding: "20px",
                borderTopLeftRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <h2 className="section-title">Get in Touch</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="query">Your Query</Label>
                  <Input
                    type="textarea"
                    name="query"
                    id="query"
                    value={formData.query}
                    onChange={handleChange}
                    placeholder="Describe your query"
                    required
                  />
                </FormGroup>
                <div className="text-end">
                  <Button type="submit" color="primary" className="submit-button">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
            <Col sm={1} 
               style={{
                backgroundColor: "#e6ffe6",
                padding: "20px",
                marginBottom: "20px",
              }}>
                <div className="vertical-bar">

                </div>
            </Col>
            {/* Contact Details */}
            <Col sm={5} className="contact-details-wrapper"
              style={{
                backgroundColor: "#e6ffe6",
                padding: "20px",
                borderTopRightRadius: "10px",
                marginBottom: "20px",
              }}
            >

              <div className="contact-detail-item mt-4">
                <H3>Amandeep Singh Walia</H3>
              </div>
              <div className="mt-1">
                Kb1802, Salarpuria Greenage, Bangalore
              </div>
              <div className="mt-1">
                Karnataka, India
              </div>
              <div className="contact-detail-item mt-1">
                <strong>Email : </strong> <a href="mailto:amanwaliaus@gmail.com" style={{ textDecoration: "none" }}>
                amanwaliaus@gmail.com
                </a>
              </div>
            </Col>
          </Row>

          {/* Map Section */}
          <Row className="mt-4">
            <Col>
              <div className="map-container">
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
