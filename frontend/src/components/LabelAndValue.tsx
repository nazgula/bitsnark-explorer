import { Typography } from "@mui/material";
import React, { useState } from "react";
import copy from '../assets/copy.svg';
import CopyButton from "./CopyButton";

export interface LabelAndValueProps {
    label: string;
    value: number | string | number[] | string[];
    mapValFn?: (val: string | number) => string;
    isCopyButton?: boolean;
    copyValue?: string;
    classNameLabel?: string;
    classNameValue?: string;
    className?: string;
}

function LabelAndValue(props: LabelAndValueProps) {
    // const [tooltip, setTooltip] = useState('');
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

    // function renderCopyButton() {
    //     const { isCopyButton = false } = props;
    //     if (isCopyButton) {
    //         return (
    //             <div className="relative inline-block">

    //                 <img src={copy} alt="copy" width="20" onClick={handleCopyClick} className="mb-2 pointer hover:bg-gray-200" />
    //                 {tooltip && (
    //                     <div className="absolute top-0 left-0 p-2 mt-2 text-xs text-white bg-gray-500 rounded">
    //                         {tooltip}
    //                     </div>
    //                 )}
    //             </div>
    //         )
    //     }
    // }
    // const handleCopyClick = () => {
    //     const { copyValue = '' } = props;
    //     navigator.clipboard.writeText(copyValue);
    //     setTooltip(`${copyValue} copied!`);
    //     setTimeout(() => setTooltip(''), 2000); // Hide tooltip after 2 seconds
    // };

    return (
        <div className={`flex flex-col text-left ${className}`}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" className={`text-xs ${classNameLabel}`} >
                {label}
            </Typography>
            <div className="flex flex-row items-center gap-2">
                {renderValue()}
                {props.isCopyButton &&
                    <CopyButton copyValue={props.copyValue || ''} />
                }
            </div>
        </div>
    );
}

export default LabelAndValue