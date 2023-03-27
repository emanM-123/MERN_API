import React from 'react';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import moment from "moment";
const column = ({ onHandelEdit,handleChangeDeleted }) => {
    return [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            tableCellProps: { align: 'center' },
            render:(title)=> title && title || 'NA'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            tableCellProps: { align: 'center' },
            render: (description ) => {
                return <div>
                    <div  style={{marginLeft:'100px', width: '600px',textOverflow: 'ellipsis',cursor:'pointer'}} > {description}</div>
            </div>;
            }
            
        },      
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            tableCellProps: { align: 'center' },
            render: (dueDate)=> dueDate && moment(dueDate).utc().format('YYYY-MM-DD') || 'NA'
            
        },       
        {
            title: 'Deleted',
            dataIndex: 'deleted',
            key: 'deleted',
            tableCellProps: { align: 'center' },
            render: (action, record) => <Box>
                <Switch
                    checked={record.deleted}
                    id='deleted'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    onChange={(value) => handleChangeDeleted(record, value.target.value)}
                    value={record.deleted}
                />
            </Box>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            tableCellProps: { align: 'center' },
            render: (action, record) => <Box>
                <IconButton
                    disabled={record.deleted}
                    onClick={() => onHandelEdit(record)}
                >

                    <EditIcon
                        color={record.deleted ? 'disabled' : 'primary'}
                    >
                        Edit
                    </EditIcon>
                </IconButton>

            </Box>
        },
    ];
};

export default column;