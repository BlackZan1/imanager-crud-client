import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import './AddPage.css';

const useStyles = makeStyles({
    input: {
        margin: '15px 0',
        fontSize: 20,
        width: 320
    },
    button: {
        margin: '30px auto'
    }
})

const AddPage = ({ addUserSubmit }) => {
    const [ data, setData ] = useState({
        email: '',
        name: ''
    });
    const [ errors, setErrors ] = useState({
        email: null,
        name: null
    });

    const classes = useStyles();

    const onChangeHandler = (ev) => {
        let { value, name } = ev.currentTarget;
        
        setErrors(prev => ({
            ...prev,
            [name]: null
        }))

        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitHandler = () => {
        let err = {
            email: null,
            name: null
        };

        for(let i in data) {
            if(!data[i].trim().length) {
                err[i] = 'Is required';
            } 
        }

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) err.email = 'Invalid email';
        if(!!err.email || !!err.name) {
            return setErrors(err);
        }

        addUserSubmit(data);
    }

    let isDisabled = !data.email.trim().length || !data.name.trim().length;

    return (
        <div className='add-page'>
            <h2>Adding a new user <PersonAddIcon /></h2>

            <TextField 
                label='Email' 
                value={data.email} 
                name='email' 
                type='email' 
                onChange={onChangeHandler}
                className={classes.input}
                error={!!errors.email ? true : false}
                helperText={!!errors.email ? errors.email : ''}
            />

            <TextField 
                label='Name' 
                value={data.name} 
                name='name' 
                onChange={onChangeHandler}
                className={classes.input}
                error={!!errors.name ? true : false}
                helperText={!!errors.name ? errors.name : ''}
            />

            <Button 
                variant={'contained'} 
                color={'primary'} 
                onClick={() => onSubmitHandler()}
                disabled={isDisabled}
                className={classes.button}
            >
                Add 
            </Button>
        </div>
    )
}

export default AddPage;