// import React from 'react'
// import { TabContent, TabPane } from 'reactstrap'
import { SimpleTabContentProp } from '../../../../Types/UiKits.type'
// import { homeTabContent } from '../../../../Data/UiKits/Tabs'

// export default function HomeTabContent({ tabId }: SimpleTabContentProp) {
//     return (
//         <TabContent activeTab={tabId}>
//             {homeTabContent && homeTabContent.map((item, index) => (
//                 <TabPane tabId={item.id} key={index}>
//                     {item.text}
//                 </TabPane>
//             ))}
//         </TabContent>
//     )
// }



import React, { useState } from 'react';


export default function HomeTabContent({ tabId }: SimpleTabContentProp) {

    const [activeTab, setActiveTab] = useState('1');
  const tabData = [
    {
      id: '1',
      icon: 'bi bi-binoculars',
      title: 'Modi sit est dela',
      heading: 'Voluptatem dignissimos',
      content: [
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit.',
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.',
      ],
      text: 'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      img: 'assets/img/working-1.jpg',
    },
    {
      id: '2',
      icon: 'bi bi-box-seam',
      title: 'Unde praesenti',
      heading: 'Neque exercitationem',
      content: [
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit.',
        'Provident mollitia neque rerum asperiores dolores quos qui a. Ipsum neque dolor voluptate nisi sed.',
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.',
      ],
      text: 'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      img: 'assets/img/working-2.jpg',
    },
    {
      id: '3',
      icon: 'bi bi-brightness-high',
      title: 'Pariatur explica',
      heading: 'Voluptatibus commodi ut',
      content: [
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit.',
        'Provident mollitia neque rerum asperiores dolores quos qui a. Ipsum neque dolor voluptate nisi sed.',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: 'assets/img/working-3.jpg',
    },
    {
      id: '4',
      icon: 'bi bi-command',
      title: 'Nostrum qui dile node',
      heading: 'Omnis fugiat ea explicabo',
      content: [
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit.',
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      img: 'assets/img/working-4.jpg',
    },
  ];

  return (
    <section id="tabs" className="tabs section">
      <div className="container">
        <ul className="nav nav-tabs row d-flex" data-aos="fade-up" data-aos-delay={100}>
          {tabData.map((tab) => (
            <li className="nav-item col-3" key={tab.id}>
              <button   
                className={`nav-link ${activeTab === tab.id ? 'active show' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={tab.icon}></i>
                <h4 className="d-none d-lg-block">{tab.title}</h4>
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content" data-aos="fade-up" data-aos-delay={200}>
          {tabData.map((tab) => (
            <div
              key={tab.id}
              className={`tab-pane fade ${activeTab === tab.id ? 'active show' : ''}`}
              id={tab.id}
            >
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                  <h3>{tab.heading}</h3>
                  <p className="fst-italic">{tab.text}</p>
                  <ul>
                    {tab.content.map((item, index) => (
                      <li key={index}>
                        <i className="bi bi-check2-all"></i> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img src={tab.img} alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
