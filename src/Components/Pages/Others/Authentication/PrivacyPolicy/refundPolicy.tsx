import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap"; // If you're using Reactstrap
import { H3, H4, H5, P } from "../../../../../AbstractElements";
import CommonCardHeader from "../../../../../Utils/CommonComponents/CommonCardHeader";
import { Link } from "react-router-dom";
import Footer from "../../../../../Layout/Footer";
import AuthHeader from "../../../../../Layout/AuthHeader/Index";

const RefundPolicy: React.FC = () => {
    return (
        <>
            <AuthHeader />
            <Container fluid className="login-card1 login-dark login-bg">
                <Card className="p-3 mx-3 w-100">
                    <H3><Link style={{cursor:"pointer"}} className="mx-4 fs-5" to={'/login'}><i className="fa fa-arrow-left me-2"></i>Back to Login</Link></H3>
                  
                    <CommonCardHeader title={'Refund Policy'} />
                    <CardBody style={{ textAlign: 'justify' }}>
                        <H5>Thank you for choosing our services. We aim to provide the highest quality and satisfaction to our customers. However, we would like to inform you that:</H5>
                        <P className="text-danger">
                            <strong>All purchases are final and non-refundable.</strong>
                        </P>
                        <H5 className="mt-4">Why No Refunds?</H5>
                        <P>Our policy of no refunds is in place due to the nature of our services, which involve:</P>
                        <ul>
                            <li>Digital services that are instantly delivered.</li>
                            <li>Personalized services that cannot be resold.</li>
                            <li>Immediate consumption or access to resources upon purchase.</li>
                        </ul>
                        {/* <H5 className="mt-4">Exceptions</H5>
                        <P>We may, at our discretion, offer refunds or credits in rare cases such as:</P>
                        <ul>
                            <li>An error on our part that led to an incorrect or undelivered service.</li>
                            <li>Technical issues that prevent you from accessing the service for which payment was made.</li>
                        </ul> */}
                        {/* <P>Please note that any such exceptions will be handled on a case-by-case basis.</P> */}

                        <H5 className="mt-4">Contact Us</H5>
                        <P>If you have any questions about this policy or if you believe you qualify for an exception, feel free to contact us at:</P>
                        <ul>
                            <li>Email: <a href="mailto:amanwaliaus@gmail.com">amanwaliaus@gmail.com</a></li>
                            <li>Phone: +91-9243251888</li>
                        </ul>
                    </CardBody>
                </Card>
            </Container>
            <Footer />
        </>
    );
};

export default RefundPolicy;
