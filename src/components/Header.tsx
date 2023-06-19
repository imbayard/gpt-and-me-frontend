import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()

    function handleNav(path: string) {
        navigate(path)
    }

    return (
        <header className="app-header">
            <h1 onClick={() => handleNav('/')}>Bayard</h1>
        </header>
    );
}

export default Header;