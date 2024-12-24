import React, { useState } from "react";
import { Slider} from "@mui/material";
import { Label } from "reactstrap";

const CapacitySlider = ({ min = 0, max = 100, step = 1, initialValue = 50, onChange }:any) => {
    const [value, setValue] = useState(initialValue);

    const handleSliderChange = (event:any, newValue:any) => {
        setValue(newValue);
        if (onChange) {
            onChange(newValue); // Call the parent-provided function with the updated value
        }
    };

    return (
        <div className="d-flex justify-content-between">
            <Slider
                color="primary"
                value={value}
                onChange={handleSliderChange}
                min={min}
                max={max}
                step={step}
                valueLabelDisplay="auto"
                sx={{ marginTop: 2 }}
            />
           
        </div>
    );
};

export default CapacitySlider;
