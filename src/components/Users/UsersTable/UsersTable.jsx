import React, { useState } from 'react';
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from 'react-sortable-hoc';
import { TableBody, TableRow, TableCell, IconButton, makeStyles, TableContainer, Table, TableHead, Paper } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import OpenWithIcon from '@material-ui/icons/OpenWith';

const useStyles = makeStyles({
    head: {
        background: '#282c34'
    },
    cell: {
        width: '35%'
    },
    drag: {
        width: '3.5%'
    },
    id: {
        width: '15%'
    },
    btn: {
        width: '5%'
    },
    headCell: {
        color: '#fff',
        fontSize: 20,
        width: '35%'
    },
    headID: {
        width: '15%'
    },
    headDrag: {
        width: '3.5%'
    },
    headBtn: {
        width: '5%'
    },
    row: {
        cursor: 'pointer',
        backgroundColor: '#fff'
    },
    bodyHead: {
        width: '15%',
        borderRight: '1px solid #dcdcdc'
    },
    bodyCell: {
        borderRight: '1px solid #dcdcdc',
        fontWeight: 600
    },
    name: {
        fontWeight: 400
    },
    bodyBtn: {
        width: '5% !important',
        textAlign: 'center'
    }
})

const TableBodySortable = SortableContainer(({ children }) => {
    return (
        <TableBody>
            { children }
        </TableBody>
    )
})

const DragHandle = SortableHandle(({ style }) => {
    return (
        <span style={{ ...style, ...{ cursor: 'move' } }} >{'::::'}</span>
    )
})

// TableBodySortable.muiName = 'TableBody';

const Row = SortableElement(({ data, onDeleteHandler }) => {
    const classes = useStyles();

    const onClickHandler = () => onDeleteHandler(data.id);

    return (
        <TableRow className={classes.row}>
            <TableCell className={classes.drag}>
                <DragHandle />
            </TableCell>

            <TableCell className={`${classes.bodyHead} ${classes.id}`}>
                {data.id}
            </TableCell>

            <TableCell align={'left'} className={`${classes.bodyCell} ${classes.cell}`}>
                {data.email}
            </TableCell>

            <TableCell align={'left'} className={`${classes.bodyCell} ${classes.name} ${classes.cell}`}>
                {data.name}
            </TableCell>

            <TableCell align={'left'} className={`${classes.bodyCell} ${classes.bodyBtn} ${classes.btn}`}>
                <IconButton aria-label='delete' color='secondary' onClick={onClickHandler}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
            
            <TableCell align={'left'} className={`${classes.bodyBtn} ${classes.btn}`}>
                <NavLink to={`/user/${data.id}`}>
                    <IconButton aria-label='delete' color='primary'>
                        <EditIcon />
                    </IconButton>
                </NavLink>
            </TableCell>
        </TableRow>  
    )
})

const SortableTable = ({ users, onDeleteHandler }) => {
    const [data, setData] = useState(users);
    const classes = useStyles();

    const onSortEnd = ({oldIndex, newIndex}) => {
        console.log(arrayMove(data, oldIndex, newIndex))

        setData(arrayMove(data, oldIndex, newIndex));
    };

    return (
        <TableContainer component={Paper} elevation={3} style={{width: '100%', margin: '30px auto'}}>
            <Table>
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell className={`${classes.headCell} ${classes.headDrag}`}>
                            <OpenWithIcon />
                        </TableCell>

                        <TableCell className={`${classes.headCell} ${classes.headID}`}>
                            ID
                        </TableCell>

                        <TableCell align={'left'} className={classes.headCell}>
                            Email
                        </TableCell>

                        <TableCell align={'left'} className={classes.headCell}>
                            Name
                        </TableCell>

                        <TableCell align={'left'} className={`${classes.headCell} ${classes.headBtn}`}>
                            Delete
                        </TableCell>

                        <TableCell align={'left'} className={`${classes.headCell} ${classes.headBtn}`}>
                            Edit
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBodySortable onSortEnd={onSortEnd} useDragHandle={true}>
                    {
                        data.map((item, index) => (
                            <Row 
                                key={item.id} 
                                data={item} 
                                index={index} 
                                onDeleteHandler={onDeleteHandler} 
                            />
                        ))
                    }
                </TableBodySortable>
            </Table>
        </TableContainer>
    )
}

export default SortableTable;