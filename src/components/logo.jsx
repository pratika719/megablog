import React from 'react'

// FIX: component was lowercase 'logo' — React components must be PascalCase to render as JSX
const Logo = ({ width = '100px' }) => {
    return (
        <div style={{ width }} className="font-bold text-xl">
            MegaBlog
        </div>
    )
}

export default Logo