import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap"; // If you're using Reactstrap
import { H4, H5, P } from "../../../../../AbstractElements";
import CommonCardHeader from "../../../../../Utils/CommonComponents/CommonCardHeader";
import { Link } from "react-router-dom";
import Footer from "../../../../../Layout/Footer";
import AuthHeader from "../../../../../Layout/AuthHeader/Index";

const RefundPolicy: React.FC = () => {
    return (
        <>
       <AuthHeader/>
        <Container className="mt-5" style={{minHeight:"550px"}}>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Link className="mx-4" to={'/login'}><h3><i className="fa fa-arrow-left me-2"></i>Back to Login</h3></Link>
                        <CommonCardHeader title={'Refund Policy'} />
                        <CardBody>
                            <H5>
                             Once a payment is made we don't provide refund as we have no refund policy.
                           </H5>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Footer/>
        </>
    );
};

export default RefundPolicy;
