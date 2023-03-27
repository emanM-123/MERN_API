import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    AutoSizer,
    Column,
    Table,
    WindowScroller,
} from 'react-virtualized';
import MUITableCell from '@material-ui/core/TableCell';
import MUITableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import FolderNodata from '../../public/app-static/img/SVGComponents/FolderNodata';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
const TableCell = withStyles(() => ({
    root:{
        border:'none',
    }
}))(MUITableCell);

const TableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#f7f7f7',
        },
        '&.MuiTableRow-hover:hover': {
            backgroundColor: theme.palette.grey[400],
        },
    },
}))(MUITableRow);

const useStyles = makeStyles((theme) => ({
    tablePaper: {
        width: '100%',
        overflow: 'auto',
    },
    tableFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(1.845, 2.5),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
    pagination: {
        '& .Mui-selected': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
        },
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        fontSize: '12px',

    },
    tableHeader:{
        fontSize: '1.1em',
        backgroundColor: '#fff',
        fontWeight: 600,
        textTransform: 'none',
        '-webkit-line-clamp': 1,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    tableCell: {
        flex: 1
    },
}));

const MuiVirtualizedTable = (props) => {
    const classes = useStyles();
    
    const headerRenderer = ({ label }) => {
        return label;
    };

    const _noRowsRenderer=({width})=>()=>{
        if (loading)
            return (
                <TableRow style={{ backgroundColor: '#fff', width,
                    height:300,
                    display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <TableCell
                        style={{
                            paddingBottom: 0,
                            paddingTop: 15,
                            borderBottom: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            textAlign: 'center',
                            overflow: 'hidden',
                        }}
                        colSpan="100%"
                    >
                        <CircularProgress />
                    </TableCell>
                </TableRow>
            );

        if (
            !loading &&
dataSource &&
!dataSource.length &&
noDataFoundText
        )
            return (
                <TableRow style={{ backgroundColor: '#fff', }}>
                    <TableCell
                        style={{
                            paddingBottom: 0,
                            paddingTop: 15,
                            textAlign: 'center',
                            width,
                            height:300
                        }}
                        colSpan="100%"
                    >
                        <FolderNodata style={{ fontSize: '9em' }} />
                        <Typography variant="h5" color={'textSecondary'}>
                            {noDataFoundText}
                        </Typography>
                    </TableCell>
                </TableRow>
            );
    };

    const {
        columns,
        dataSource,
        noDataFoundText,
        tablePaginationProps,
        tableHeight,
        loading,
        tableTitle,
        tableFooterExtra,
        rowExpandable,
        ...tableProps
    } = props;

    return (
        <Paper className={classes.tablePaper}>
            {tableTitle ? <EnhancedTableToolbar {...props} /> : null}
            <TableContainer
                className={classes.container}
            >
                <WindowScroller scrollElement={undefined}>
                    {({ height }) => (
                        <AutoSizer disableHeight>
                            {({ width }) => (
                                <Table
                                    noRowsRenderer={_noRowsRenderer({height,width})}
                                    height={height - tableHeight}
                                    width={width}
                                    rowCount={loading?0:dataSource.length}
                                    rowGetter={({ index }) => dataSource[index]}
                                    {...tableProps}
                                >
                                    {rowExpandable? <Column
                                        headerClassName={classes.tableHeader}
                                        className={classes.tableRootBorder}
                                      
                                        headerRenderer={() =>{
                                            return null;
                                        }}
                                        width={100}
                                        cellRenderer={({rowData})=>{
                                            return <CollapseColumn {...{...props,record:rowData,width}}/>;
                                        }}          
                                    />  :null} 
                                  
                                    {columns.map(
                                        (
                                            { tableCellProps = {}, key, title, render, dataIndex },
                                            index
                                        ) => {
                                            const columnProps = {
                                                cellRenderer: ({cellData,rowData,rowIndex}) => {
                                                    return render ? render(cellData, rowData, rowIndex) : cellData;
                                                },
                                                label: title,
                                                dataKey: dataIndex,
                                                ...tableCellProps
                                            };

                                            return (
                                                <Column
                                                    headerClassName={classes.tableHeader}
                                                    className={classes.tableRootBorder}
                                                    key={key}
                                                    headerRenderer={(headerProps) =>
                                                        headerRenderer({
                                                            ...headerProps,
                                                            columnIndex: index,
                                                        })
                                                    }
                                                    width={width/columns.length}
                                                    {...columnProps}
                                                />   
                                            );
                                        }
                                    )}
                                </Table>
                            )}
                        </AutoSizer>
                    )}
                </WindowScroller>
            </TableContainer>
            {(tablePaginationProps && dataSource && dataSource.length) ||
        tableFooterExtra ? (
                    <TableFooter component="div" className={classes.tableFooter}>
                        {tablePaginationProps ? (
                            <TablePagination
                                rowsPerPageOptions={[20, 100, 200, 500, 1000]}
                                className={classes.pagination}
                                component="div"
                                {...(loading
                                    ? {
                                        nextIconButtonProps: { disabled: loading },
                                        backIconButtonProps: { disabled: loading },
                                    }
                                    : {})}
                                {...tablePaginationProps}
                            />
                        ) : null}

                        {tableFooterExtra ? (
                            <Box
                                width="100%"
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-end"
                                flex="auto"
                            >
                                {tableFooterExtra}
                            </Box>
                        ) : null}
                    </TableFooter>
                ) : null}
        </Paper>
    );
};

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.shape({
        flexContainer: PropTypes.string,
        noClick: PropTypes.string,
        tableCell: PropTypes.string,
        tableRow: PropTypes.string,
        tableRowHover: PropTypes.string,
    }).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            cellContentRenderer: PropTypes.func,
            dataKey: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
        })
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
    headerHeight: 56,
    onRowClick: undefined,
    rowClassName: null,
    rowHeight: 56,
    sort: undefined,
};

MuiVirtualizedTable.childContextTypes = {
    table: PropTypes.object,
};

export default MuiVirtualizedTable;

const useToolbarStyles = makeStyles((theme) => ({
    tableToolbar: {
        padding: theme.spacing(2.5, 2),
        border: '1px solid #e0e0e0',
        borderBottom: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        borderTopRightRadius: theme.spacing(1.25),
        borderTopLeftRadius: theme.spacing(1.25),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar className={classes.tableToolbar}>
            <Box fontWeight={600} fontSize={22} color="text.primary">
                {props.tableTitle}
            </Box>
            {props.tableExtra ? (
                <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                    flex="auto"
                >
                    {props.tableExtra}
                </Box>
            ) : null}
        </Toolbar>
    );
};
EnhancedTableToolbar.propTypes = {
    tableTitle: PropTypes.string,
    tableExtra: PropTypes.any,
};

function CollapseColumn(props) {
    const {expandedRowRender,record,width}=props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment> 
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <Dialog 
                open={open}
                maxWidth='md'
                width={width}
                fullWidth
                onClose={() => setOpen(!open)}
            >
                <Box>
                    {expandedRowRender&&expandedRowRender(record)}
                </Box>
            </Dialog>
        </React.Fragment>
    );
}