import React from 'react'
import appwriteService from  '../services/appwriteService'
import {Link} from 'react-router-dom'


function Postcard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-centre mb-4'>

                <div >
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
                   
                </div>
                 <h2 classname='text-xl font-bold text-gray-900'>{title}</h2>

            </div>
        </div>
        </Link>
  )
}

export default Postcard