import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: 'Login',
            slug: "/login",
            // FIX: was 'active: true' — Login should only show when NOT authenticated
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: "/signup",
            // FIX: was 'active: true' — Signup should only show when NOT authenticated
            active: !authStatus
        },
        {
            name: 'All Posts',
            // FIX: was "/all-post" — router defines "/all-posts" (with 's')
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: "/add-post",
            active: authStatus
        }
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex items-center'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    {/* FIX: was 'flex-ml-auto' which is not a valid Tailwind class */}
                    <ul className='flex ml-auto items-center'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white hover:text-gray-800'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        ))}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header