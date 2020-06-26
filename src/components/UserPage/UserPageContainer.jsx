import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo';

import { BigLoader } from '../Loader/Loader';
import UserPage from './UserPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { USER_QUERY, DELETE_USER, UPDATE_USER } from '../../queries';

const UserPageContainer = ({ match: { params: { id } }, history }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const { data, loading, error } = useQuery(USER_QUERY, { variables: { id } })
    const [deleteUser] = useMutation(DELETE_USER);
    const [updateUser] = useMutation(UPDATE_USER);

    useEffect(() => {
        document.title = `UserID: ${id}`;
    }, [id])

    const onDeleteHandler = () => {
        deleteUser({ variables: { id } });

        setIsDeleted(true);
    }

    const onUpdateHandler = (data) => {
        let { email, name } = data;

        updateUser({ variables: { id, email, name } });

        history.push('/');
    }

    console.log(data, loading, error);

    if(!!error) {
        return <NotFoundPage />
    }

    if(isDeleted) {
        return <Redirect to={'/'} />
    }

    return loading ? 
    <BigLoader /> 
    : 
    <UserPage 
        email={data.user.email} 
        id={data.user.id} 
        name={data.user.name} 
        onDeleteHandler={onDeleteHandler}
        onUpdateHandler={onUpdateHandler}
    />
}

export default withRouter(UserPageContainer);