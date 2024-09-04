import { Typography } from "@mui/material";
import React from "react";

export interface LabelAndValueProps {
    label: string;
    value: number | string | number[] | string[];
    // isMap?: boolean;
    mapValFn?: (val: string | number) => string;
    classNameLabel?: string;
    classNameValue?: string;
    className?: string;
}

function LabelAndValue(props: LabelAndValueProps) {
    const { classNameLabel = '', className = '', label, value } = props;


    function renderValue() {
        const { classNameValue = '', mapValFn = (v: string | number) => v } = props;
        if (value instanceof Array) {
            return (
                value.map((val: string | number) => (
                    <Typography component="div" gutterBottom className={`text-xs ${classNameValue}`}>
                        {mapValFn(val)}
                    </Typography>
                ))
            )
        } else {
            return (
                <Typography component="div" gutterBottom className={`text-xs ${classNameValue}`}>
                    {value}
                </Typography>
            )
        }

    }

    return (
        <div className={`flex flex-col text-left ${className}`}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" className={`text-xs ${classNameLabel}`} >
                {label}
            </Typography>
            {renderValue()}
        </div>
    );
}

export default LabelAndValue