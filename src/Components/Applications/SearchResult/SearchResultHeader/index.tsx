import React, { useEffect, useState } from 'react';
import { CardHeader, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import { Btn } from '../../../../AbstractElements';
import { getStorageType } from '../../../../api-service/Facility/Index';
import CapacitySlider from './CapacilitySlider';

export default function SearchResultHeader({ searchFacility }: { searchFacility: (filterValue: any) => void }) {
    const [storagetype, setStorageTypes] = useState([]);
    const [StorageTypeId, setStorageTypeId] = useState('');
    const [storageTypeName, setStorageTypeName] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchCapacity, setSearchCapacity] = useState(0);

    const getStorageTypes = async () => {
        const response = await getStorageType();
        if (response != null) {
            setStorageTypes(response.data);
        }
    };

    useEffect(() => {
        getStorageTypes();
    }, []);

    const handleCapacityChange = (newValue: any) => {
        setSearchCapacity(newValue);
    };

    const handleSearchFilter = () => {
        const filterObject = {
            storageTypeId: StorageTypeId,
            capacity: searchCapacity,
            searchText: searchText.trim() || null, // Handle empty strings
        };

        console.log('Filter Object:', filterObject); // Debugging the object
        searchFacility(filterObject); // Passing the object to the function
    };

    return (
        <CardHeader>
            <Form
                className="theme-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchFilter(); // Trigger filter on form submission
                }}
            >
                <Row>
                    {/* Storage Type Selection */}
                    <Col md={2}>
                        <InputGroup className="m-0 flex-nowrap">
                            <FormGroup>
                                <select
                                    onChange={(e) => {
                                        const selectedOption = e.target.selectedOptions[0];
                                        const selectedValue = selectedOption.value;
                                        const selectedText = selectedOption.text;
                                        setStorageTypeId(selectedValue);
                                        setStorageTypeName(selectedText);
                                    }}
                                    style={{ width: '100%' }}
                                    value={StorageTypeId}
                                >
                                    <option value="">Select Storage Type</option>
                                    {storagetype &&
                                        storagetype.map((storagetype: any) => (
                                            <option key={storagetype._id} value={storagetype._id}>
                                                {storagetype.Type}
                                            </option>
                                        ))}
                                </select>
                            </FormGroup>
                        </InputGroup>
                    </Col>

                    {/* Capacity Slider */}
                    <Col md={2} className="pb-3">
                        <CapacitySlider
                            min={0}
                            max={5000}
                            step={100}
                            initialValue={100}
                            onChange={handleCapacityChange}
                        />
                    </Col>
                    <Col sm={1}>
                        <Label className="mt-3">{searchCapacity ?? 0} Tons</Label>
                    </Col>

                    {/* Search Input */}
                    <Col md={12}>
                        <InputGroup className="m-0 flex-nowrap">
                            <Input
                                type="search"
                                placeholder="Search Facility .."
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <Btn color="primary" onClick={handleSearchFilter}>
                                <InputGroupText className="bg-primary border-0 p-0">{'Search'}</InputGroupText>
                            </Btn>
                        </InputGroup>
                    </Col>
                </Row>
            </Form>
        </CardHeader>
    );
}












// import React from 'react'
// import { CardHeader, Form, Input, InputGroup, InputGroupText } from 'reactstrap'
// import { Btn } from '../../../../AbstractElements'

// export default function SearchResultHeader({ searchFacility }: { searchFacility: (value: string) => void }) {

//     return (
//         <CardHeader>
//             <Form className="theme-form" onSubmit={(e) => e.preventDefault()}>
//                 <InputGroup className="m-0 flex-nowrap">
//                     <Input type="search" placeholder="Search Facility .." plaintext onChange={(e)=>{searchFacility(e.target.value)}} />
//                     <Btn color='primary'>
//                         <InputGroupText className='bg-primary border-0 p-0'>{'Search'}</InputGroupText>
//                     </Btn>
//                 </InputGroup>
//             </Form>
//         </CardHeader>
//     )
// }