

// import React from 'react'
// import { useSelector } from 'react-redux';
// import { RootState } from '../../ReduxToolkit/Store';

// import { Col, Nav, NavItem } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import { Image, LI, UL } from '../../AbstractElements';
// import { dynamicImage } from '../../Utils';
// import UserWrap from '../Header/HeaderRight/UserWrap';

// export default function AuthHeader() {
//     const { sideBarToggle } = useSelector((state: RootState) => state.layout);

//     return (
//         <header className={`page-header row ${sideBarToggle ? 'close_icon' : ''}`}>
//             <Col xs="auto" className="logo-wrapper d-flex align-items-center">
//                 <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
//                     <Image className="light-logo img-fluid" width={150} height={100} src={dynamicImage(`logo/BMCLogoDark.webp`)} alt="logo" />
//                     <Image className="dark-logo img-fluid" src={dynamicImage(`logo/BMCLogoLight.webp`)} alt="logo" />
//                 </Link>
//             </Col>
//             <Col className="page-main-header d-flex justify-content-end">
//                 <div className="nav-right">
//                     <UL className="header-right simple-list flex-row">
//                         <LI className="d-flex">
//                             <Link to={'/contact'}>Contact Us</Link>
//                         </LI>
//                         <LI className="d-flex">
//                             <Link to={'/login'}>Login</Link>
//                         </LI>
//                     </UL>
//                 </div>
//             </Col>
//         </header>
//     )
// }



import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../ReduxToolkit/Store';

import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { H5, Image, LI, UL } from '../../AbstractElements';
import { dynamicImage } from '../../Utils';

export default function AuthHeader() {
    const { sideBarToggle } = useSelector((state: RootState) => state.layout);
    const [isHidden, setIsHidden] = useState(false); // Tracks if the header should be hidden
    const [lastScrollY, setLastScrollY] = useState(0); // Tracks the last scroll position

    // Handle scroll direction
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down and past 100px, hide the header
            setIsHidden(true);
        } else {
            // Scrolling up, show the header
            setIsHidden(false);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Cleanup the event listener on unmount
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header
            className={`page-header row ${sideBarToggle ? 'close_icon' : ''} ${
                isHidden ? 'hidden-header' : ''
            }`}
            style={{
                transition: 'transform 0.3s ease-in-out',
                transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
            }}
        >
            <Col xs="auto" className="logo-wrapper d-flex align-items-center">
                <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                    <Image
                        className="light-logo img-fluid"
                        width={150}
                        height={100}
                        src={dynamicImage(`logo/BMCLogoDark.webp`)}
                        alt="logo"
                    />
                    <Image
                        className="dark-logo img-fluid"
                        src={dynamicImage(`logo/BMCLogoLight.webp`)}
                        alt="logo"
                    />
                </Link>
            </Col>
            <Col className="page-main-header d-flex justify-content-end">
                <div className="nav-right">
                    <UL className="header-right simple-list flex-row">
                        <LI className="d-flex">
                            <Link to={'/contactus'}><H5>Contact</H5> </Link>
                        </LI>
                        <LI className="d-flex">
                            <Link to={'/login'}> <H5>Login</H5> </Link>
                        </LI>
                    </UL>
                </div>
            </Col>
        </header>
    );
}
