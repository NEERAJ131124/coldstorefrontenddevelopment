import React from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap"; // If you're using Reactstrap
import { H3, P } from "../../../../../AbstractElements";
import CommonCardHeader from "../../../../../Utils/CommonComponents/CommonCardHeader";
import { Link } from "react-router-dom";
import Header from "../../../../../Layout/Header";
import Footer from "../../../../../Layout/Footer";
import AuthHeader from "../../../../../Layout/AuthHeader/Index";

const TermsAndCondition: React.FC = () => {
    return (
        <>
            <AuthHeader />
            <Container fluid className="login-card login-dark login-bg">
                <Card className="p-3 mx-3">
                    <H3><Link style={{cursor:"pointer"}} className="mx-4 fs-5" to={'/login'}><i className="fa fa-arrow-left me-2"></i>Back to Login</Link></H3>
                    <CommonCardHeader title={'Terms & Conditions'} />
                    <CardBody style={{ textAlign: 'justify' }}>
                        <P>
                            <strong>1. </strong> This document is an electronic record in terms of Information Technology Act, 2000 and rules
                            there under as applicable and the amended provisions pertaining to electronic records in various
                            statutes as amended by the Information Technology Act, 2000. This electronic record is generated
                            by a computer system and does not require any physical or digital signatures.</P>
                        <P>
                            <strong>2. </strong>This document is published in accordance with the provisions of Rule 3 (1) of the Information
                            Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and
                            regulations, privacy policy and Terms of Use for access or usage of domain name
                            <strong><a href="https://www.bookmycoldstore.com"> https://www.bookmycoldstore.com</a>  </strong>('Website'), including the related mobile site and mobile application
                            (hereinafter referred to as 'Platform').</P>
                        <P>
                            <strong>3. </strong>  The Platform is owned by <strong>Amandeep Singh Walia</strong>, a company incorporated under the Companies
                            Act, 1956 with its registered office at <strong>kb 1802, salarpuria greeange, bangalore, BENGALURU
                                URBAN, KARNATAKA, 560068 ,Bangalore ,India</strong> (hereinafter referred to as ‘Platform
                            Owner’, 'we', 'us', 'our').. </P>
                        <P>
                            <strong>4. </strong> Your use of the Platform and services and tools are governed by the following terms and
                            conditions (“Terms of Use”) as applicable to the Platform including the applicable policies which
                            are incorporated herein by way of reference. If You transact on the Platform, You shall be subject
                            to the policies that are applicable to the Platform for such transaction. By mere use of the Platform,
                            You shall be contracting with the Platform Owner and these terms and conditions including the
                            policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to
                            your use of our website, goods (as applicable) or services (as applicable) (collectively, 'Services').
                            Any terms and conditions proposed by You which are in addition to or which conflict with these
                            Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect.
                            These Terms of Use can be modified at any time without assigning any reason. It is your
                            responsibility to periodically review these Terms of Use to stay informed of updates..</P>
                        <P>
                            <strong>5. </strong>
                            For the purpose of these Terms of Use, wherever the context so requires ‘you’, 'your' or ‘user’ shall
                            mean any natural or legal person who has agreed to become a user/buyer on the Platform..</P>

                        <strong>
                            <strong>6. </strong>  ACCESSING, BROWSING, OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
                        </strong>

                        <P className="mt-2">
                            <strong>7. </strong>The use of Platform and/or availing of our Services is subject to the following Terms of Use:
                        </P>
                        <ul className="mx-2 mt-3">
                            <li>

                                <P>
                                    <strong>1. </strong>
                                    To access and use the Services, you agree to provide true, accurate, and complete
                                    information to us during and after registration, and you shall be responsible for
                                    all acts done through the use of your registered account on the Platform.
                                </P>
                            </li>
                            <li>

                                <P><strong>2. </strong> Neither we nor any third parties provide any warranty or guarantee as to the accuracy,
                                    timeliness, performance, completeness, or suitability of the information and materials
                                    offered on this website or through the Services, for any specific purpose. You
                                    acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude
                                    liability for any such inaccuracies or errors to the fullest extent permitted by law.
                                </P>
                            </li>
                            <li><P><strong>3. </strong>
                                Your use of our Services and the Platform is solely and entirely at your own risk and discretion for which we shall not be liable to you in any manner. You are required to independently assess and ensure that the Services meet your requirements.
                            </P></li>
                            <li>
                                <P><strong>4. </strong>
                                    The contents of the Platform and the Services are proprietary to us and are licensed to us. You will not have any authority to claim any intellectual property rights, title, or interest in its contents. The contents include and are not limited to the design, layout, look, and graphics.
                                </P>
                            </li>
                            <li><P><strong>5. </strong>
                                You acknowledge that unauthorized use of the Platform and/or the Services may lead to action against you as per these Terms of Use and/or applicable laws.
                            </P></li>
                            <li><P><strong>6. </strong>
                                You agree to pay us the charges associated with availing the Services.
                            </P></li>
                            <li>
                                <P>
                                    <strong>7. </strong>
                                    You agree not to use the Platform and/or Services for any purpose that is unlawful, illegal, or forbidden by these Terms, or Indian or local laws that might apply to you.
                                </P></li>
                            <li>
                                <P><strong>8. </strong>
                                    You agree and acknowledge that the website and the Services may contain links to other third-party websites. On accessing these links, you will be governed by the terms of use, privacy policy, and such other policies of such third-party websites. These links are provided for your convenience to provide further information.
                                </P></li>
                            <li>
                                <P><strong>9. </strong>
                                    You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the Platform Owner for the Services.
                                </P></li>
                            <li><P><strong>10. </strong>
                                You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions
                                including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Terms of Use, privacy Policy, and other Policies, or Your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.
                            </P></li>
                            <li><P>
                                <strong>11. </strong>
                                Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
                            </P>
                            </li>
                            <li><P><strong>12. </strong>
                                These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.
                            </P></li>
                            <li><P><strong>13. </strong>
                                All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in <strong>Bangalore</strong> and <strong>Karnataka</strong>.
                            </P></li>
                            <li><P><strong>14. </strong>
                                All concerns or communications relating to these Terms must be addressed in writing.
                            </P></li>
                        </ul>

                        {/* <h4 className="mb-2 mt-3">Grievance Officer</h4>
                            <P>Phone: +1-123-456-7890</P>
                            <P>Address: Kb1802 , Salarpuria Greenage , Bangalore</P>
                            <P>Email: amanwaliaus@gmail.com </P> */}
                    </CardBody>
                </Card>
            </Container>
            <Footer />
        </>

    );
};

export default TermsAndCondition;
