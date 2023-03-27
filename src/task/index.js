import React,{useState,useEffect} from 'react';
import  Box  from '@material-ui/core/Box';
import {useStore} from 'laco-react';
import ContainerHeader from '../component/ContainerHeader';
import Table from '../component/Table';
import {editTask, getAllTask} from '../services';
import {TaskStore} from './TaskStore';
import column from './column';
import CreateTask from './CreateTask';
import Confirm from '../component/Confirm';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
function Role() { 
    const [loading,setLoading]=useState(false);
    const {listData,paginationProps} =useStore(TaskStore);
    const[searchFilterObj] = useState({});
    const [onLoad,setOnLoad] = useState(false);

    useEffect(() =>{
        if(onLoad){
            onSearch(searchFilterObj);
        }
        else setOnLoad(true);
    },[]);

    const onSearch=(obj)=>{
        let pagination ={
            ...paginationProps,
            count:0,
            page:0,
        };
        TaskStore.set(
            () => ({ paginationProps:pagination }),
            'ClientStore-update-paginationProps'
        );
        getAllData(pagination,obj);
    };
    const getAllData=(pagination=paginationProps)=>{
        setLoading(true);
        let query={$limit:pagination.rowsPerPage,$skip:pagination.page > 0? (pagination.page * pagination.rowsPerPage):0,...searchFilterObj
        };
        getAllTask(query).then((res)=>{
            const {data,limit,skip,total} = res.data;
            TaskStore.set(
                () => ({listData:{ data:data,hasMore:total>(limit+skip)}, paginationProps: { ...pagination, count:total}  }),
                'taskStore-data-loader'
            );
            setLoading(false);
        }).catch(()=>{
            TaskStore.set(
                () => ({listData:{ data:[],hasMore:false} }),
                'taskStore-data-loader'
            );
            setLoading(false);
        });
    };

    const setPaginationPropsData = (obj) => {
        TaskStore.set(
            () => ({ paginationProps: { ...paginationProps, ...obj} }),
            'taskStore-update-paginationProps'
        );
        getAllData({ ...paginationProps, ...obj});
    };

    useEffect(()=>{
        if(!listData.data.length) getAllData();
        return ()=>{
            TaskStore.set(
                () => ({
                    listData: { data: [], hasMore: true },
                    paginationProps: { count: 0,rowsPerPage: 20, page: 0 },
                }),
                'AssignRoleStore-selectedEditObj-edit'
            );
        
        };
    },[]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const action = (key) => (
        <Button onClick={() => closeSnackbar(key)}>{'Dismiss'}</Button>
    );
    const handleChangeDeleted = (record) => {
        Confirm(
            'Task',
            `Are you sure you want to ${
                record.deleted ? 'Un-Delete' : 'Delete'
            } this Task ?`
        ).then(() => {
            editTask({ ...record, deleted: !record.deleted })
                .then(() => {
                    let list = [...listData.data];
                    let index = list.findIndex((item) => item._id === record._id);
                    list.splice(index, 1, {
                        ...list[index],
                        deleted: !record.deleted,
                    });

                    TaskStore.set(
                        () => ({
                            listData: { data: list, hasMore: listData.hasMore },
                        }),
                        'update-jobs'
                    );
                    enqueueSnackbar(
                        !record.deleted
                            ? 'Deleted Successfully'
                            : 'Un-Deleted Successfully',
                        { action, variant: 'success' }
                    );
                })
                .catch((error) => {
                    enqueueSnackbar(error.message, {
                        action,
                        variant: 'error',
                    });
                });
        });
    };
    const onHandelEdit=(record)=>{
        TaskStore.set(
            () => ({isOpenDialog:true,selectedEditObj:{
                ...record,
            } }),
            'task-edit'
        );
    };

    return (
        <Box style={ {marginTop:20}}>
            <ContainerHeader  
                title={<Box component='span' fontSize='20px' padding= '10px' fontWeight='500'> Task Management </Box>}
                extra={
                    <Box display='flex' alignItems='center'>
                        <Box mr={1}>
                           
                        </Box>
                        <Box display='flex'>
                            <CreateTask/>
                        </Box>
                    </Box>
                }
            />
            <Table 
               
                columns={column({onHandelEdit:onHandelEdit, handleChangeDeleted: handleChangeDeleted,})}
                tableProps={{
                    stickyHeader:true,
                    'aria-label':'sticky table'
                }}
                loading={loading}
                dataSource= {listData.data}
                rowKey= {(record) => record._id}
                 
                tableBorder
                tablePaginationProps={{ 
                    ...paginationProps,
                    onChangePage:(event, newPage)=>{
                        setPaginationPropsData({page:newPage});
                    },
                    onChangeRowsPerPage:(event)=>{
                        setPaginationPropsData({rowsPerPage:event.target.value, page:0});
                    }
                }}
                tableHeight={290}
                noDataFoundText={'No data found'}
            />
            
        </Box>
    );
}

export default Role;



