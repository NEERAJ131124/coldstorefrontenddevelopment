import React from "react";
import { useNavigate } from "react-router-dom";
import { Btn } from "../AbstractElements";
import { ArrowLeft } from "react-feather";

const BackButton = ({ label = "Back" }) => {
    const navigate = useNavigate();

    return (
        <Btn
            onClick={() => navigate(-1)}
            className="btn btn-primary"
            color="primary"
        >
            <ArrowLeft/>
            {label}
        </Btn>
    );
};

export default BackButton;
