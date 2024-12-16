

import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../ReduxToolkit/Store';

import { Col, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Image, LI, UL } from '../../AbstractElements';
import { dynamicImage } from '../../Utils';
import UserWrap from '../Header/HeaderRight/UserWrap';

export default function AuthHeader() {
    const { sideBarToggle } = useSelector((state: RootState) => state.layout);

    return (
        <header className={`page-header row ${sideBarToggle ? 'close_icon' : ''}`}>
            <Col xs="auto" className="logo-wrapper d-flex align-items-center">
                <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                    <Image className="light-logo img-fluid" width={150} height={100} src={dynamicImage(`logo/BMCLogoDark.webp`)} alt="logo" />
                    <Image className="dark-logo img-fluid" src={dynamicImage(`logo/BMCLogoLight.webp`)} alt="logo" />
                </Link>
            </Col>
            <Col className="page-main-header d-flex justify-content-end">
                <div className="nav-right">
                    <UL className="header-right simple-list flex-row">
                        <LI className="d-flex">
                            <Link to={'/about'}>About Us</Link>
                        </LI>
                        <LI className="d-flex">
                            <Link to={'/contact'}>Contact Us</Link>
                        </LI>
                    </UL>
                </div>
            </Col>
        </header>
    )
}