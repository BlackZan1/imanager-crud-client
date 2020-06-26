import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './NotFoundPage.css';

const NotFoundPage = () => {
    useEffect(() => {
        document.title = 'Not found'
    }, [])

    return (
        <div className='not-found-page'>
            <h2 style={{ marginBottom: '-15px' }}>Not found 404</h2>
            <h1>Don't worry!</h1>

            <NavLink className='link' to={'/'}>Main page ></NavLink>
        </div>
    )
}

export default NotFoundPage;