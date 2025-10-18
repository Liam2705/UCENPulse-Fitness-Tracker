import React from 'react';
import Date from '../utils/Date.jsx';

function Header() {
    return (
        <div className="header">
            <h3 className="header-text">Welcome Back!</h3>
            <Date />
        </div>
    );
}

export {Header};