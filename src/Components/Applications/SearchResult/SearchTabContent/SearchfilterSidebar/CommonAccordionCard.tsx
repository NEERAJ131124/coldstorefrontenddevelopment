import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Collapse, Input, Label } from 'reactstrap';
import { ChevronDown, ChevronUp, Search } from 'react-feather';
import { CommonAccordionCardProps } from '../../../../../Types/Miscellaneous.type';
import { Btn, H2 } from '../../../../../AbstractElements';
import { getStorageType } from '../../../../../api-service/Facility/Index';
import CapacitySlider from '../../SearchResultHeader/CapacilitySlider';

export default function CommonAccordionCard({
    items,
    onFilterChange,
}: CommonAccordionCardProps & { onFilterChange: (filters: any) => void }) {
    const [open, setOpen] = useState(true);
    const [storagetype, setStorageTypes] = useState([]); // For dropdown options
    const [StorageTypeId, setStorageTypeId] = useState(""); // Selected storage type ID
    const [StorageTypeName, setStorageTypeName] = useState(""); // Selected storage type name
    const [searchText, setSearchText] = useState('');
    const [searchCapacity, setSearchCapacity] = useState(0);

    const handleClick = () => setOpen(!open);

    // Fetch storage types
    const getStorageTypes = async () => {
        const response = await getStorageType();
        if (response != null) {
            setStorageTypes(response.data);
        }
    };

    // Handle search text input
    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        triggerFilterChange(value, StorageTypeId, searchCapacity);
    };

    // Handle capacity slider change
    const handleCapacityChange = (newValue: number) => {
        setSearchCapacity(newValue);
        triggerFilterChange(searchText, StorageTypeId, newValue);
    };

    // Handle dropdown change
    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.selectedOptions[0];
        const selectedValue = selectedOption.value;
        const selectedText = selectedOption.text;

        setStorageTypeId(selectedValue); // Update the selected ID
        setStorageTypeName(selectedText); // Update the selected name
        triggerFilterChange(searchText, selectedValue, searchCapacity); // Trigger filter change
    };

    // Unified function to trigger filter change
    const triggerFilterChange = (searchText: string, StorageTypeId: string, searchCapacity: number) => {
        onFilterChange({
            searchText,
            StorageTypeId,
            searchCapacity,
        });
    };

    useEffect(() => {
        getStorageTypes();
    }, []);

    return (
        <Card>
            <CardHeader>
                <H2 className="mb-0">
                    <Btn
                        color="transparent"
                        block
                        className="btn-link d-flex align-items-center gap-2 justify-content-between"
                        onClick={handleClick}
                    >
                        {items.heading} {open ? <ChevronDown /> : <ChevronUp />}
                    </Btn>
                </H2>
            </CardHeader>
            <Collapse isOpen={open}>
                <CardBody
                    className={`animate-chk ${items.id === 1 ? 'filter-cards-view basic-form' : ''}`}
                >
                    {items.id === 1 && (
                        <>
                            {/* Search Input */}
                            <div className="job-filter mb-2">
                                <div className="faq-form">
                                    <Input
                                        type="text"
                                        placeholder="Search.."
                                        value={searchText}
                                        onChange={handleSearchTextChange}
                                    />
                                    <Search className="search-icon" />
                                </div>
                            </div>
                            {/* Capacity Slider */}
                            <div className="job-filter">
                                <CapacitySlider
                                    min={0}
                                    max={5000}
                                    step={100}
                                    initialValue={searchCapacity}
                                    onChange={handleCapacityChange}
                                />
                                <Label className="mt-3">{searchCapacity ?? 0} Tons</Label>
                            </div>
                            {/* Storage Type Dropdown */}
                            <div className="job-filter mt-3">
                                <Label for="storageType">Select Storage Type</Label>
                                <select
                                    id="storageType"
                                    className="form-select"
                                    onChange={handleDropdownChange}
                                    style={{ width: '100%' }}
                                    value={StorageTypeId}
                                >
                                    <option value="">Select Storage Type</option>
                                    {storagetype &&
                                        storagetype.map((type: any) => (
                                            <option key={type._id} value={type._id}>
                                                {type.Type}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </>
                    )}
                </CardBody>
                <Btn className="text-center" color="primary" block={items.id !== 1}>
                    {items.buttonTitle}
                </Btn>
            </Collapse>
        </Card>
    );
}
