import React, { useState } from "react";
import copy from '../assets/copy.svg';

export interface CopyButtonProps {
    copyValue: string;
    className?: string;
}

function CopyButton(props: CopyButtonProps) {
    const [tooltip, setTooltip] = useState('');
    const { copyValue, className = '' } = props;


    const handleCopyClick = () => {
        navigator.clipboard.writeText(copyValue);
        setTooltip(`${copyValue} copied!`);
        setTimeout(() => setTooltip(''), 2000); // Hide tooltip after 2 seconds
    };

    return (
        <div className="relative inline-block">
            <img src={copy} alt="copy" width="20" onClick={handleCopyClick} className={`mb-2 pointer hover:bg-gray-200 z-0 ${className}`} />
            {tooltip && (
                <div className="absolute top-0 left-0 p-2 mt-2 text-xs text-white bg-gray-500 rounded">
                    {tooltip}
                </div>
            )}
        </div>
    );
}

export default CopyButton