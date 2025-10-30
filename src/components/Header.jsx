import React from 'react';
import Date from '../utils/Date.jsx';

function Header({ pageTitle }) {
    return (
        <header className="header">
            <h1 className="header-text">{pageTitle}</h1>
            <Date />
        </header>
    );
}

export { Header };