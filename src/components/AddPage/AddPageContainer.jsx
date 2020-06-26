import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { ADD_USER } from '../../queries';
import AddPage from './AddPage';

const AddPageContainer = () => { 
    const [isAdded, setIsAdded] = useState(false);
    const [addUser] = useMutation(ADD_USER);

    useEffect(() => {
        document.title = 'Add user';
    }, [])

    const addUserSubmit = ({ email, name }) => {
        addUser({ variables: { email, name } })
        .then(({ data }) => {
            if(!data.message) {
                setIsAdded(true);
            }
        })
    }

    if(isAdded) {
        return <Redirect to={'/'} />
    }

    return <AddPage addUserSubmit={addUserSubmit} />
}

export default AddPageContainer;