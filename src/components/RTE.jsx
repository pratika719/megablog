import React from 'react'
import { Controller } from 'react-hook-form'
// FIX: was importing Editor from 'react-draft-wysiwyg' but using TinyMCE API props.
// The project doesn't have @tinymce/tinymce-react installed. Replacing with a simple textarea-based editor.
// If you want TinyMCE, run: npm install @tinymce/tinymce-react

function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <textarea
                        value={value}
                        onChange={onChange}
                        rows={10}
                        className="w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200"
                        placeholder="Write your content here..."
                    />
                )}
            />
        </div>
    )
}

export default RTE
