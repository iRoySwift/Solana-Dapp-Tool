import React, { useState } from "react";

interface Props {
    label?: string;
    disabled?: boolean;
    checked: boolean;
    onChange: () => void;
}
const Switch: React.FC<Props> = props => {
    const { checked, disabled, label, onChange } = props;
    return (
        <label className="inline-flex cursor-pointer items-center">
            <input
                type="checkbox"
                checked={checked}
                className="peer sr-only"
                onChange={onChange}
                disabled={disabled}
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {label}
            </span>
        </label>
    );
};
export default Switch;
