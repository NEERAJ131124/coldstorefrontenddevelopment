import React, { useState, useEffect } from 'react';
import testinmonial1 from '../../../../assets/img/testimonials/testimonials-1.jpg';
import testinmonial2 from '../../../../assets/img/testimonials/testimonials-2.jpg';
import testinmonial3 from '../../../../assets/img/testimonials/testimonials-3.jpg';
// import testinmonial4 from '../../../../assets/img/testimonials/testimonials-4.jpg';
// import testinmonial5 from '../../../../assets/img/testimonials/testimonials-5.jpg';
import { P } from '../../../../AbstractElements';

const testimonialsData = [
  {
    id: 1,
    name: 'Aman Singh',
    position: 'CEO & Founder',
    image: testinmonial1,
    testimonial: `"The services provided were exceptional! The team went above and beyond to ensure our needs were met. Highly recommend to anyone seeking professionalism and quality!"`,
  },
  {
    id: 2,
    name: 'John Doe',
    position: 'Product Manager',
    image: testinmonial2,
    testimonial: `"An amazing experience from start to finish! The team was highly professional, and the final product exceeded our expectations. Would love to work with them again."`,
  },
  {
    id: 3,
    name: 'Jane Smith',
    position: 'Marketing Director',
    image: testinmonial3,
    testimonial: `"Top-notch services and attention to detail. The team truly cares about delivering results. I highly recommend them to anyone looking for quality service."`,
  },
  // Add more testimonials as needed
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Function to change the testimonial to the next one
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  // Function to change the testimonial to the previous one
  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  // Automatically change the testimonial every 8 seconds, unless hovered
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextTestimonial, 5000); // Change every 8 seconds (8000ms)

      // Cleanup interval on component unmount or when hover state changes
      return () => clearInterval(interval);
    }
  }, [isHovered]); // Only reset interval if hover state changes

  const { name, position, image, testimonial } = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <P>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</P>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div
          className="testimonial-item"
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true on hover
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false when hover ends
        >
          <img src={image} className="testimonial-img" alt={name} />
          <h3>{name}</h3>
          <h4>{position}</h4>
          <div className="stars">
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
            <i className="bi bi-star-fill" />
          </div>
          <p>
            <i className="bi bi-quote quote-icon-left" />
            <span>{testimonial}</span>
            <i className="bi bi-quote quote-icon-right" />
          </p>
        </div>

        <div className="testimonial-navigation">
          <button onClick={prevTestimonial} className="prev-btn">
            &#10094; Prev
          </button>
          <button onClick={nextTestimonial} className="next-btn">
            Next &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}
