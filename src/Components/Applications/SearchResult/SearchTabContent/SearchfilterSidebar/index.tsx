import React, { useState } from 'react';
import { Col } from 'reactstrap';
import { Btn } from '../../../../../AbstractElements';
import { searchFilterAccordionCardData } from '../../../../../Data/Miscellaneous/JobSearch';
import CommonAccordionCard from './CommonAccordionCard';

export default function SearchFilter({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    };

    const handleAccordionFilterChange = (id: number, filters: any) => {
        onFilterChange({ [id]: filters });
    };

    return (
        <Col xl={12}>
            <div className="md-sidebar">
                <Btn color="primary" className="email-aside-toggle md-sidebar-toggle" onClick={toggle}>
                    Facility Filter
                </Btn>
                <div className={`md-sidebar-aside job-sidebar ${open ? 'open' : ''}`}>
                    <div className="default-according style-1 faq-accordion job-accordion">
                        {searchFilterAccordionCardData.map((items) => (
                            <div className="accordion" key={items.id}>
                                <CommonAccordionCard
                                    items={items}
                                    onFilterChange={(filters) => handleAccordionFilterChange(items.id, filters)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Col>
    );
}
