import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        // FIX: button was missing onClick={logoutHandler}
        <button
            onClick={logoutHandler}
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white hover:text-gray-800'
        >
            Logout
        </button>
    )
}

export default LogoutBtn