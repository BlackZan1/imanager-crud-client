import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';

import Users from './Users';
import { BigLoader } from '../Loader/Loader';
import { GET_USERS, DELETE_USER } from '../../queries';

const UsersContainer = () => {
    const [ options, setOptions ] = useState({
        skip: 0,
        limit: 10
    });

    let { skip, limit } = options;

    const [ users, setUsers ] = useState([]); 
    const [ isFetching, setIsFetching ] = useState(true); 
    const { data, loading, refetch } = useQuery(GET_USERS, 
        { variables: { skip, limit } }
    );
    const [ deleteUser ] = useMutation(DELETE_USER);

    const onDeleteHandler = (id) => {
        deleteUser({ variables: { id } });
        setIsFetching(true);

        refetch({ variables: { variables: { skip, limit } } })
        .then(({ data }) => {
            console.log(data);

            if(!!data) { 
                setUsers(data.users);
                setIsFetching(loading);
            }
        })
    }

    const onChangeHandler = (ev) => {
        let { name, value } = ev.currentTarget;

        localStorage.setItem(`imanager_${name}`, JSON.stringify({ value }));

        setOptions(prev => ({
            ...prev,
            [name]: +value
        }))
    }

    useEffect(() => {
        if(!!data) {
            setUsers(data.users);
            setIsFetching(loading);
        }
    }, [data, loading])

    useEffect(() => {
        const lsLimit = JSON.parse(localStorage.getItem('imanager_limit') || '{}');
        const lsSkip = JSON.parse(localStorage.getItem('imanager_skip') || '{}');

        if(lsLimit.value) {
            setOptions(prev => ({
                ...prev,
                limit: +lsLimit.value
            }))
        }

        if(lsSkip.value) {
            setOptions(prev => ({
                ...prev,
                skip: +lsSkip.value
            }))
        }
    }, [])

    useEffect(() => {
        document.title = 'iManager';

        setIsFetching(true);

        refetch({ variables: { variables: { skip, limit } } })
        .then(({ data }) => {
            console.log(data);

            if(!!data) { 
                setUsers(data.users);
                setIsFetching(loading);
            }
        })
    }, [limit, skip, refetch, loading])

    return isFetching ? 
    <BigLoader /> 
    : 
    <Users 
        users={users} 
        onDeleteHandler={onDeleteHandler} 
        onChangeHandler={onChangeHandler}
        options={options}
    />
}

export default UsersContainer;