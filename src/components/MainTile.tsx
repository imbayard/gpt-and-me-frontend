import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainTile.css';

const MainTile = ({ title, page }: {title: string, page: string}) => {
    const navigate = useNavigate();
    
    const handleNavigation = () => {
        navigate(page);
    }
    
    return (
        <div className="main-tile" onClick={handleNavigation}>
            {title}
        </div>
    );
}

export default MainTile;