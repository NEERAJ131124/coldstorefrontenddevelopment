import React, { useState, useEffect } from 'react';
import { P } from '../../../../AbstractElements';

const Stats = () => {
  // Initializing states for counters
  const [happyClients, setHappyClients] = useState(0);
  const [projects, setProjects] = useState(0);
  const [hoursOfSupport, setHoursOfSupport] = useState(0);
  const [hardWorkers, setHardWorkers] = useState(0);

  // Function to animate the counters
  const animateCounter = (endValue:any, setValue:any) => {
    let startValue = 0;
    const duration = 2000; 
    const incrementTime = 10;
    const step = (endValue / duration) * incrementTime; 

    const interval = setInterval(() => {
      startValue = Math.min(startValue + step, endValue); 
      setValue(Math.floor(startValue)); 

      if (startValue === endValue) {
        clearInterval(interval); 
      }
    }, incrementTime);
  };

  useEffect(() => {
    animateCounter(232, setHappyClients); 
    animateCounter(521, setProjects); 
    animateCounter(1463, setHoursOfSupport); 
    animateCounter(15, setHardWorkers); 
  }, []);

  return (
    <section id="stats" className="stats section">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fa fa-smile"  color='primary'/>
            <div className="stats-item">
              <span className="counter">{happyClients}</span>
              <P>Happy Clients</P>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
          <i className="fa-solid fa-plus"></i>
            <div className="stats-item">
              <span className="counter">{projects}</span>
              <P>Storages</P>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fa-solid fa-headphones" color='primary'></i>
            <div className="stats-item">
              <span className="counter">{hoursOfSupport}</span>
              <P>Hours Of Support</P>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fa-regular fa-circle-user" color='primary'></i>
            <div className="stats-item">
              <span className="counter">{hardWorkers}</span>
              <P>Hard Workers</P>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
