// import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LayoutRoutes from './LayoutRoutes'
import PrivateRoutes from './PrivateRoutes';
// import SignIn from '../Auth';
import VisualLogin2 from '../Components/Pages/Others/Authentication/VisualLogin2';
import { decodeToken } from '../Config/apiConfig';
import PrivacyPolicy from '../Components/Pages/Others/Authentication/PrivacyPolicy/Index';
import TermsAndCondition from '../Components/Pages/Others/Authentication/PrivacyPolicy/termsandContitions';
import RefundPolicy from '../Components/Pages/Others/Authentication/PrivacyPolicy/refundPolicy';
import RegisterWithImageTwo from '../Components/Pages/Others/Authentication/RegisterWithImageTwo';
import RegisterWizard from '../Components/Pages/Others/Authentication/RegisterWizard';
import RegisterSimple from '../Components/Pages/Others/Authentication/RegisterSimple';
import HomePage from '../Pages/Pages/Home';
import ContactUs from '../Components/Pages/Others/Authentication/ContactUs/Index';

export default function Routers() {
    const token = decodeToken()

    return (
        <BrowserRouter basename={'/'}>
            <Routes>
                {token ? (
                    <>
                        <Route path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />} />
                        <Route path={`/`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />} />
                    </>
                ) : (
                    ""
                )}
                <Route path={"/"} element={<PrivateRoutes />}>
                    <Route path={`/*`} element={<LayoutRoutes />} />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/login`} element={<VisualLogin2 />} />
                <Route path={`${process.env.PUBLIC_URL}/privacypolicy`} element={<PrivacyPolicy />} />
                <Route path={`${process.env.PUBLIC_URL}/terms`} element={<TermsAndCondition />} />
                <Route path={`${process.env.PUBLIC_URL}/refundpolicy`} element={<RefundPolicy />} />
                <Route path={`${process.env.PUBLIC_URL}/register`} element={<RegisterSimple />} />
                <Route path={`${process.env.PUBLIC_URL}/home`} element={<HomePage />} />
                <Route path={`${process.env.PUBLIC_URL}/contactus`} element={<ContactUs />} />


            </Routes>
        </BrowserRouter>
    )
}