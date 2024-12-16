import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { LoginFormProp } from '../../../../../Types/Others.type';
import CommonLogo from './CommonLogo';
import { Btn, H2, P } from '../../../../../AbstractElements';
import { Agreewith, CreateAccount, CreateYourAccount, EmailAddress, Href, SignIn, YourName } from '../../../../../Utils/Constants';
import SocialLinks from './SocialLinks';
import axios from 'axios';

export default function RegisterForm({ logoClass }: LoginFormProp) {
    const [formData, setFormData] = useState({ name: '', lastName: '', email: '', phoneNumber: '', checkbox1: false });
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [phoneOtpSent, setPhoneOtpSent] = useState(false);
    const [emailOtp, setEmailOtp] = useState("");
    const [phoneOtp, setPhoneOtp] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    const handleEmailOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailOtp(e.target.value);
    };

    const handlePhoneOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneOtp(e.target.value);
    };

    const handleSendEmailOtp = async () => {
        if (formData.email) {
            try {
                const response = await axios.post("http://localhost:8888/user/sendemailotp", { Email: formData.email });
                if (response.status === 200) {
                    alert("OTP sent to email!");
                    setEmailOtpSent(true);
                } else {
                    alert("Failed to send OTP.");
                }
            } catch (error) {
                alert("Error sending OTP.");
            }
        } else {
            alert("Please enter a valid email.");
        }
    };

    const handleVerifyEmailOtp = async () => {
        if (emailOtp) {
            try {
                const response = await axios.post("http://localhost:8888/user/verifyemailotp", { Email: formData.email, Otp: emailOtp });
                if (response.status === 200) {
                    alert("Email verified successfully!");
                    setEmailVerified(true);
                } else {
                    alert("Invalid OTP.");
                }
            } catch (error) {
                alert("Error verifying OTP.");
            }
        } else {
            alert("Please enter the OTP.");
        }
    };

    const handleSendPhoneOtp = async () => {
        if (formData.phoneNumber) {
            try {
                // const response = await axios.post("http://localhost:8888/user/sendphoneotp", { PhoneNumber: formData.phoneNumber });
                // if (response.status === 200) {
                    alert("OTP sent to phone!");
                    setPhoneOtpSent(true);
                // } else {
                //     alert("Failed to send OTP.");
                // }
            } catch (error) {
                alert("Error sending OTP.");
            }
        } else {
            alert("Please enter a valid phone number.");
        }
    };

    const handleVerifyPhoneOtp = async () => {
        if (phoneOtp) {
            try {
                // const response = await axios.post("http://localhost:8888/user/verifyphoneotp", { PhoneNumber: formData.phoneNumber, Otp: phoneOtp });
                // if (response.status === 200) {
                //     alert("Phone number verified successfully!");
                    setPhoneVerified(true);
                // } else {
                //     alert("Invalid OTP.");
                // }
            } catch (error) {
                alert("Error verifying OTP.");
            }
        } else {
            alert("Please enter the OTP.");
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!emailVerified || !phoneVerified) {
            alert("Please verify both email and phone number before submitting.");
            return;
        }
        try {
            const res = await axios.post('http://localhost:8888/user/register', {
                Email: formData.email,
                PhoneNumber: formData.phoneNumber,
                FirstName: formData.name,
                LastName: formData.lastName
            });
            console.log(res);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div>
            <div>
                <CommonLogo logoClass={logoClass} />
            </div>
            <div className="login-main">
                <Form className="theme-form" onSubmit={handleSubmit}>
                    <H2 className="text-center">{CreateYourAccount}</H2>
                    <P className="text-center">{"Enter your personal details to create account"}</P>
                    <FormGroup>
                        <Col><Label className='pt-0'>{YourName}</Label></Col>
                        <Row className='g-2'>
                            <Col xs={6}>
                                <Input type='text' id="name" required placeholder='First name' value={formData.name} onChange={handleInputChange} />
                            </Col>
                            <Col xs={6}>
                                <Input type='text' id="lastName" required placeholder='Last name' value={formData.lastName} onChange={handleInputChange} />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Col><Label>{EmailAddress}</Label></Col>
                        <Input type='email' id="email" required placeholder='Test@gmail.com' value={formData.email} onChange={handleInputChange} />
                        {emailOtpSent ? (
                            <>
                                <Input
                                    type="text"
                                    id="emailOtp"
                                    value={emailOtp}
                                    onChange={handleEmailOtpChange}
                                    placeholder="Enter OTP"
                                    className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md"
                                />
                                <Btn
                                    type="button"
                                    onClick={handleVerifyEmailOtp}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Verify Email
                                </Btn>
                            </>
                        ) : (
                            <Btn
                                type="button"
                                onClick={handleSendEmailOtp}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Send OTP
                            </Btn>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Col><Label>Phone Number</Label></Col>
                        <Input type='tel' id="phoneNumber" required placeholder='123-456-7890' value={formData.phoneNumber} onChange={handleInputChange} />
                        {phoneOtpSent ? (
                            <>
                                <Input
                                    type="text"
                                    id="phoneOtp"
                                    value={phoneOtp}
                                    onChange={handlePhoneOtpChange}
                                    placeholder="Enter OTP"
                                    className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md"
                                />
                                <Btn
                                    type="button"
                                    onClick={handleVerifyPhoneOtp}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Verify Phone
                                </Btn>
                            </>
                        ) : (
                            <Btn
                                type="button"
                                onClick={handleSendPhoneOtp}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Send OTP
                            </Btn>
                        )}
                    </FormGroup>
                    <FormGroup className='mb-0 checkbox-checked'>
                        <FormGroup className='checkbox-solid-info' check>
                            <Input id='checkbox1' type='checkbox' checked={formData.checkbox1} onChange={handleInputChange} />
                            <Label className='text-muted' htmlFor='checkbox1' check>{Agreewith}</Label>
                            <a className='ms-3' href={Href}>{'Privacy Policy'}</a>
                        </FormGroup>
                        <Btn color='primary' className='w-100 mt-3' block>{CreateAccount}</Btn>
                    </FormGroup>
                    <SocialLinks logtext={"Already have an account?"} btntext={SignIn} />
                </Form>
            </div>
        </div>
    );
}
