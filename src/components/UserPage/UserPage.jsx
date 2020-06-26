import React, { useState } from 'react';
import {
    TextField,
    Button,
    IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';

import './UserPage.css';

const useStyles = makeStyles({
    button: {
        margin: '5px 20px'
    },
    input: {
        margin: '15px 0',
        fontSize: 20,
        width: 320
    }
})

const UserPage = ({ email, name, id, onDeleteHandler, onUpdateHandler }) => {
    const classes = useStyles();
    const [staticData] = useState({
        email,
        name
    });
    const [userData, setUserData] = useState({
        email,
        name
    });

    const onChangeHandler = (ev) => {
        let { value, name } = ev.currentTarget;

        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const resetData = () => {
        setUserData({
            email: staticData.email,
            name: staticData.name
        })
    }

    return (
        <div className='user-page'>
            <h3>
                UserID: 
                &nbsp;
                <span> 
                    { id } 
                </span>
            </h3>

            <TextField 
                label="Email" 
                value={userData.email} 
                name='email' 
                onChange={onChangeHandler}
                className={classes.input}
            />

            <TextField 
                label="Name" 
                value={userData.name} 
                name='name' 
                onChange={onChangeHandler}
                className={classes.input}
            />

            <div className='user-page-btns'>
                <IconButton 
                    aria-label='reset' 
                    color={'primary'} 
                    className={classes.button}
                    onClick={() => resetData()}
                >
                    <RefreshIcon />
                </IconButton>

                <Button 
                    variant={'outlined'} 
                    color={'primary'} 
                    className={classes.button}
                    onClick={() => onUpdateHandler(userData)}
                >
                    Update
                </Button>

                <Button 
                    variant={'contained'} 
                    color={'secondary'} 
                    className={classes.button}
                    onClick={() => onDeleteHandler()}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default UserPage;