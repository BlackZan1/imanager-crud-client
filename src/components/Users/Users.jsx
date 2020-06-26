import React from 'react';
import { NavLink } from 'react-router-dom';
// Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TextField, makeStyles } from '@material-ui/core';

import UsersTable from './UsersTable/UsersTable';

import './Users.css';

const useStyles = makeStyles({
    input: {
        width: 200,
        margin: '10px 0 0 10px'
    }
})

const Users = ({ users, onDeleteHandler, onChangeHandler, options: { skip, limit } }) => {
    const classes = useStyles();

    return (
        <div className='wrapper'>
            <div className='wrapper-top'>
                <div className='wrapper-top-left'>
                   <h3>There are {users.length} users in the database</h3>

                   <TextField
                        label='Skip'
                        defaultValue={skip}
                        variant='outlined'
                        size='small'
                        type='number'
                        name='skip'
                        className={classes.input}
                        onChange={onChangeHandler}
                    />

                    <TextField
                        label='Limit'
                        defaultValue={limit}
                        variant='outlined'
                        size='small'
                        type='number'
                        name='limit'
                        className={classes.input}
                        onChange={onChangeHandler}
                    />
                </div>

                <NavLink to={'/add'}>Add user <AddCircleIcon /></NavLink>
            </div>

            <UsersTable users={users} onDeleteHandler={onDeleteHandler} />
        </div>
    )
} 

export default Users;