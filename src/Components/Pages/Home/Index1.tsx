import { useNavigate } from 'react-router-dom';
import '../../../../src/assets/css/main.css'
import { H2, P } from '../../../AbstractElements';
import image from '../../../../src/assets/img/hero-bg.jpg'
import Client1 from '../../../../src/assets/img/clients/client-1.png'
import Client2 from '../../../../src/assets/img/clients/client-2.png'
import Client3 from '../../../../src/assets/img/clients/client-3.png'
// import Client4 from '../../../../src/assets/img/clients/client-4.png'
// import Client5 from '../../../../src/assets/img/clients/client-5.png'
// import Client6 from '../../../../src/assets/img/clients/client-6.png'
// import Client7 from '../../../../src/assets/img/clients/client-7.png'
// import Client8 from '../../../../src/assets/img/clients/client-8.png'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { useState } from 'react';
import HomeTabContent from './component/HomeTabContent';
import Testimonials from './component/Testimonials';
import Stats from './component/Stats';
import Services from './component/Services';


export default function HomePageSample() {
  const [basicTab, setBasicTab] = useState('1');
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/register')
  }
  return (
    <div>
      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <img src={image} alt="" data-aos="fade-in" />
          <div className="container">
            <div className="row">
              {/* 🌍  */}
              <div className="col-lg-8">
                <H2 data-aos="fade-up" data-aos-delay={100}>Be a Part of the International Food Supply Chain</H2>
                <P data-aos="fade-up" data-aos-delay={200}>Manage your cold store with our Digital Solution</P>
                <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay={300}>
                  <a href="#" onClick={() => { handleRegister() }} className="btn-get-started">Register now</a>
                  <a href="#" onClick={() => { handleRegister() }} className="btn-get-started text-white fs-6 pointer mx-3" style={{ background: '#308e87' }}>Lifetime onboarding fee of 999 INR (Non Refundable)</a>
                </div>
              </div>
            </div>
          </div>
        </section>{/* /Hero Section */}
        {/* Clients Section */}
        <section id="clients" className="clients section">
          <div>
            <Row>
              <Col sm={4}>
                <div className="swiper-slide"><img src={Client1} className="img-fluid" alt="" /></div>
              </Col>
              <Col sm={4}>
                <div className="swiper-slide"><img src={Client2} className="img-fluid" alt="" /></div>
              </Col>
              <Col sm={4}>
                <div className="swiper-slide"><img src={Client3} className="img-fluid" alt="" /></div>
              </Col>
            </Row>
          </div>
        </section>
        {/* /Clients Section */}
        {/* About Section */}
        <section id="about" className="about section section-bg dark-background">
          <div className="container position-relative">
            <div className="row gy-5">
              <div className="content col-xl-5 d-flex flex-column" data-aos="fade-up" data-aos-delay={100}>
                <h3 className="mb-3">✨ Benefits:</h3>
                <P>
                  <span className="me-2 text-primary fs-5">✔️</span>
                  Online presence and discovery of your cold store
                </P>
              </div>
              <div className="col-xl-7" data-aos="fade-up" data-aos-delay={200}>
                <div className="row gy-4">
                  <div className="col-md-12 icon-box position-relative">
                    <i className="bi bi-briefcase" />
                    <h3>🚀 Coming Soon Features:</h3>
                    <ul className="list-unstyled py-3">
                      <li className="mb-2 d-flex align-items-start fs-5">
                        <span className="me-2 text-warning fs-4">⚡</span>
                        Cold store management solution
                      </li>
                      <li className="mb-2 d-flex align-items-start fs-5">
                        <span className="me-2 text-warning fs-4">⚡</span>
                        Online booking and payment by users
                      </li>
                      <li className="mb-2 d-flex align-items-start fs-5">
                        <span className="me-2 text-warning fs-4">⚡</span>
                        Online monitoring system (Temperature / Humidity / CO2, etc.)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <Stats/> */}
        {/* Tabs Section */}
        {/* <section className="tabs section">
          <Card>
            <CardBody>
              <Container>
                <ul className="nav nav-tabs row  d-flex" data-aos="fade-up" data-aos-delay={100}>
                  <li className="nav-item col-12">
                    <HomeTabContent tabId={basicTab} />
                  </li>
                </ul>
              </Container>
            </CardBody>
          </Card>
        </section> */}

        {/* Services Section */}
        {/* <Services/> */}
        {/* <section id="services" className="services section section-bg dark-background">
          <div className="container section-title" data-aos="fade-up">
            <h2>Services</h2>
            <P>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</P>
          </div>
          <div className="container">
            <div className="row gy-4">
              <div className="col-md-6" data-aos="fade-up" data-aos-delay={100}>
                <div className="service-item d-flex position-relative h-100">
                  <i className="bi bi-briefcase icon flex-shrink-0" />
                  <div>
                    <h4 className="title"><a href="#" className="stretched-link">Lorem Ipsum</a></h4>
                    <P className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</P>
                  </div>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-up" data-aos-delay={200}>
                <div className="service-item d-flex position-relative h-100">
                  <i className="bi bi-card-checklist icon flex-shrink-0" />
                  <div>
                    <h4 className="title"><a href="#" className="stretched-link">Dolor Sitema</a></h4>
                    <P className="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</P>
                  </div>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-up" data-aos-delay={300}>
                <div className="service-item d-flex position-relative h-100">
                  <i className="bi bi-bar-chart icon flex-shrink-0" />
                  <div>
                    <h4 className="title"><a href="#" className="stretched-link">Sed ut perspiciatis</a></h4>
                    <P className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</P>
                  </div>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-up" data-aos-delay={400}>
                <div className="service-item d-flex position-relative h-100">
                  <i className="bi bi-binoculars icon flex-shrink-0" />
                  <div>
                    <h4 className="title"><a href="#" className="stretched-link">Magni Dolores</a></h4>
                    <P className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</P>
                  </div>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-up" data-aos-delay={500}>
                <div className="service-item d-flex position-relative h-100">
                  <i className="bi bi-brightness-high icon flex-shrink-0" />
                  <div>
                    <h4 className="title"><a href="#" className="stretched-link">Nemo Enim</a></h4>
                    <P className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</P>
                  </div>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-up" data-aos-delay={600}>
                <div className="service-item d-flex position-relative h-100">
                  <i className="bi bi-calendar4-week icon flex-shrink-0" />
                  <div>
                    <h4 className="title"><a href="#" className="stretched-link">Eiusmod Tempor</a></h4>
                    <P className="description">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</P>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* /Services Section */}
        {/* Portfolio Section */}

        {/* <section id="portfolio" className="portfolio section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Portfolio</h2>
            <P>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</P>
          </div>
          <div className="container">
            <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
              <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay={100}>
                <li data-filter="*" className="filter-active">All</li>
                <li data-filter=".filter-app">App</li>
                <li data-filter=".filter-product">Product</li>
                <li data-filter=".filter-branding">Branding</li>
                <li data-filter=".filter-books">Books</li>
              </ul>
              <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay={200}>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/app-1.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>App 1</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/app-1.jpg" title="App 1" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/product-1.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>Product 1</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/product-1.jpg" title="Product 1" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/branding-1.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>Branding 1</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/branding-1.jpg" title="Branding 1" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/books-1.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>Books 1</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/books-1.jpg" title="Branding 1" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/app-2.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>App 2</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/app-2.jpg" title="App 2" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/product-2.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>Product 2</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/product-2.jpg" title="Product 2" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/branding-2.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>Branding 2</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/branding-2.jpg" title="Branding 2" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/books-2.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>Books 2</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/books-2.jpg" title="Branding 2" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/app-3.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>App 3</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/app-3.jpg" title="App 3" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/product-3.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>Product 3</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/product-3.jpg" title="Product 3" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/branding-3.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>Branding 3</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/branding-3.jpg" title="Branding 2" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
                  <div className="portfolio-content h-100">
                    <img src="assets/img/portfolio/books-3.jpg" className="img-fluid" alt="" />
                    <div className="portfolio-info">
                      <h4>Books 3</h4>
                      <P>Lorem ipsum, dolor sit amet consectetur</P>
                      <a href="assets/img/portfolio/books-3.jpg" title="Branding 3" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                      <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Testimonials Section */}
        {/* <Testimonials /> */}
      </main>
    </div>
  );
};

