import React, { forwardRef, useId } from 'react'

// FIX: Select was NOT wrapped in forwardRef properly — the ref was passed as second param
// but the component was not defined as forwardRef at the top
const Select = forwardRef(function Select(
    {
        options,
        label,
        className = "",
        // FIX: was 'classname' (lowercase n) — should be className to follow React conventions
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                // FIX: was using classname (not className) so Tailwind styles were never applied
            >
                {options?.map((option) => (
                    // FIX: was <options> (invalid HTML tag) — should be <option>
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
})

export default Select