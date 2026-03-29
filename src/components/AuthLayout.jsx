import React, { useState, useEffect } from 'react'
// FIX: useeffect (lowercase) is not valid — must be useEffect
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

// FIX: component was exported as "Protected" but imported as "AuthLayout" everywhere
export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // FIX: was using useeffect (invalid); also logic was wrong:
        // when authentication=true (protected route) and user NOT logged in → go to /login
        // when authentication=false (public route like /login) and user IS logged in → go to /
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        // FIX: setLoader(false) was never called, causing the loader to stay forever
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading.....</h1> : <>{children}</>
}
