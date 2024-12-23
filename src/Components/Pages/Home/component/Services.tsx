import React from 'react';

interface Service {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const servicesData: Service[] = [
  {
    icon: 'bi-briefcase',
    title: 'Cold Storage Solutions',
    description: 'Secure and reliable cold storage facilities for all your temperature-sensitive goods, ensuring freshness and quality.',
    delay: 100,
  },
  {
    icon: 'bi-card-checklist',
    title: 'Temperature Control',
    description: 'Precise temperature control for different storage needs, from frozen to chilled, to meet all food safety standards.',
    delay: 200,
  },
  {
    icon: 'bi-bar-chart',
    title: 'Inventory Management',
    description: 'Advanced inventory tracking system to monitor your stored items and optimize space usage efficiently.',
    delay: 300,
  },
  {
    icon: 'bi-binoculars',
    title: '24/7 Surveillance',
    description: 'Round-the-clock surveillance and security systems to ensure your goods are safe and secure at all times.',
    delay: 400,
  },
  {
    icon: 'bi-brightness-high',
    title: 'Flexible Storage Plans',
    description: 'Choose from a variety of storage plans that fit your needs, whether short-term or long-term storage.',
    delay: 500,
  },
  {
    icon: 'bi-calendar4-week',
    title: 'Easy Booking & Access',
    description: 'Easily book your cold storage space and gain access whenever you need it with our user-friendly platform.',
    delay: 600,
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="services section section-bg dark-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Cold Storage Services</h2>
        <p>Efficient and reliable storage solutions for temperature-sensitive products. Book your space with us today!</p>
      </div>
      <div className="container">
        <div className="row gy-4">
          {servicesData.map((service, index) => (
            <div className="col-md-6" data-aos="fade-up" data-aos-delay={service.delay} key={index}>
              <div className="service-item d-flex position-relative h-100">
                <i className={`bi ${service.icon} icon flex-shrink-0`} />
                <div>
                  <h4 className="title">
                    <a href="#" className="stretched-link">{service.title}</a>
                  </h4>
                  <p className="description">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
