import React from 'react';

import loader from '../../img/loading.gif';

import './Loader.css';

export const BigLoader = () => {
    return <div className='big-loader'>
        <img src={loader} alt="Loader???"/>
    </div>
}