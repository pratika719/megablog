import React from 'react'
// FIX: was importing from '../services/appwriteService' which doesn't exist
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredimage }) {
    // FIX: prop was featuredImage (capital I) but Appwrite field & service uses featuredimage
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full mb-4'>
                    {/* FIX: classname="justify-centre" — Tailwind uses justify-center; also classname→className */}
                    <img
                        src={appwriteService.getFilePreview(featuredimage)}
                        alt={title}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    {/* FIX: was classname (lowercase 'n') — React requires className */}
                    <h2 className='text-xl font-bold text-gray-900 mt-2'>{title}</h2>
                </div>
            </div>
        </Link>
    )
}

export default Postcard