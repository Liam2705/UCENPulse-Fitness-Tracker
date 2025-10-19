import React from 'react';
import Date from '../utils/Date.jsx';

function Header({pageTitle}) {
    return (
        <div className="header">
            <h3 className="header-text">{pageTitle}</h3>
            <Date />
        </div>
    );
}

export {Header};