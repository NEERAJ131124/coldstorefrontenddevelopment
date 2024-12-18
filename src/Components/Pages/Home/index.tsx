import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { H3, H4, P } from '../../../AbstractElements';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const handleRegister=()=>{
        navigate('/register')
    }
    return (
        <>
            <Container fluid style={{ minHeight: '550px', backgroundColor: '#f9f9f9' }}>
                <Row className="justify-content-center">
                    <Col sm={10} lg={8}>
                        {/* Main Card */}
                        <Card className="shadow-lg my-5 border-0 rounded-4">
                            {/* Gradient Header */}
                            <CardHeader
                                className="p-5 text-center text-white"
                                style={{
                                    background: 'linear-gradient(135deg, #308e87 0%, #2575fc 100%)',
                                    borderRadius: '8px 8px 0 0',
                                }}
                            >
                                <H3 className="fw-bold mb-3">🌍 Be a part of the International Food Supply Chain</H3>
                                <H4 className="fw-normal">Manage your cold store with our Digital Solution</H4>
                            </CardHeader>

                            {/* Card Body */}
                            <CardBody className="p-4">
                                {/* Call to Action */}
                                <div className="text-center mb-4">
                                    <P className="fs-5">
                                        <strong>Register now</strong>{' '}
                                        <span className="badge bg-success text-white fs-6 pointer" onClick={()=>{handleRegister()}} style={{cursor:'pointer'}}>
                                            Lifetime onboarding fee of 999 INR
                                        </span>
                                    </P>
                                </div>

                                {/* Benefits Section */}
                                <div className="mb-4">
                                    <H4 className="mb-3">✨ Benefits:</H4>
                                    <ul className="list-unstyled">
                                        <li className="mb-2 d-flex align-items-start">
                                            <span className="me-2 text-primary fs-5">✔️</span>
                                            Online presence and discovery of your cold store
                                        </li>
                                    </ul>
                                </div>

                                {/* Coming Soon Features */}
                                <div className="mt-4">
                                    <H4 className="mb-3 text-warning">🚀 Coming Soon Features:</H4>
                                    <ul className="list-unstyled">
                                        <li className="mb-2 d-flex align-items-start">
                                            <span className="me-2 text-warning fs-5">⚡</span>
                                            Cold store management solution
                                        </li>
                                        <li className="mb-2 d-flex align-items-start">
                                            <span className="me-2 text-warning fs-5">⚡</span>
                                            Online booking and payment by users
                                        </li>
                                        <li className="mb-2 d-flex align-items-start">
                                            <span className="me-2 text-warning fs-5">⚡</span>
                                            Online monitoring system (Temperature / Humidity / CO2, etc.)
                                        </li>
                                    </ul>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
