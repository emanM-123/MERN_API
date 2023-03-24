import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MUITableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import MUITableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
// import useTheme from '@material-ui/styles/useTheme';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import FolderNodata from '../../component/FolderNodata';
import Toolbar from '@material-ui/core/Toolbar';

const TableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        fontSize: '0.5em',
    // fontWeight: 500
    },
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
    tableHead: {
        fontSize: 30,
    },
    tablePaper: {
        width: '100%',
        overflow: 'auto',
    },
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    tableFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(1.845, 2.5),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
    tableOutBorder: {
    // borderRight:`1px solid ${theme.palette.grey[200]}`,
    // borderLeft:`1px solid ${theme.palette.grey[200]}`,
    },
    tableRootBorder: {
        '& td': {
            borderTop: `1px solid ${theme.palette.grey[300]}`,
            borderBottom: `1px solid ${theme.palette.grey[300]}`,
            // borderRight:`1px solid ${theme.palette.grey[300]}`,
        },
        // table right border
        '& td:last-child ': {
            borderRight: `1px solid ${theme.palette.grey[300]}`,
        },
        // table left border
        '& td:first-child ': {
            borderLeft: `1px solid ${theme.palette.grey[300]}`,
        },
        '& th': {
            borderTop: `1px solid ${theme.palette.grey[300]}`,
            // borderRight:`1px solid ${theme.palette.grey[300]}`,
        },
        '& th:first-child ': {
            borderLeft: `1px solid ${theme.palette.grey[300]}`,
        },
    },
    pagination: {
        '& .Mui-selected': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
        },
    },
}));

function CustomTable(props) {
    const {
        columns,
        dataSource,
        rowKey,
        tableProps,
        rowExpandable,
        tablePaginationProps,
        tableBorder,
        tableHeight,
        loading,
        noDataFoundText,
        tableTitle,
        tableFooterExtra,
        rowExpandablePlacement='left'
    } = props;
    const classes = useStyles();
    // const theme = useTheme();
    // const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Paper className={classes.tablePaper}>
            {tableTitle ? <EnhancedTableToolbar {...props} /> : null}
            <TableContainer
                className={classes.container}
                style={
                    tableProps.stickyHeader
                        ? { height: `calc(100vh - ${tableHeight}px)` }
                        : {}
                }
            >
                <Table
                    className={clsx({
                        [classes.tableOutBorder]: true,
                        [classes.tableRootBorder]: tableBorder,
                    })}
                    {...tableProps}
                >
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {rowExpandablePlacement === 'left' && rowExpandable ? <TableCell /> : null}
                            {columns.map(({ tableCellProps = {}, key, title }) => {
                                return (
                                    <TableCell {...tableCellProps} key={key}>
                                        {title}
                                    </TableCell>
                                );
                            })}
                            {rowExpandablePlacement === 'right' && rowExpandable ? <TableCell /> : null}

                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <TableRow style={{ backgroundColor: '#fff' }}>
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
                    ) : (
                        <TableBody>
                            {dataSource.map((record, index) => {
                                return (
                                    <Row
                                        {...props}
                                        key={rowKey(record)}
                                        record={record}
                                        index={index}
                                    />
                                );
                            })}
                        </TableBody>
                    )}
                    {!loading && dataSource && !dataSource.length && noDataFoundText ? (
                        <TableRow style={{ backgroundColor: '#fff' }}>
                            <TableCell
                                style={{
                                    paddingBottom: 0,
                                    paddingTop: 15,
                                    textAlign: 'center',
                                    height: 300,
                                }}
                                colSpan="100%"
                            >
                                <FolderNodata style={{ fontSize: '9em' }} />
                                <Typography variant="h5" color={'textSecondary'}>
                                    {noDataFoundText}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : null}
                </Table>
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
}

CustomTable.propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    rowKey: PropTypes.func,
    tableProps: PropTypes.object,
    rowExpandable: PropTypes.bool,
    tablePaginationProps: PropTypes.object,
    tableBorder: PropTypes.bool,
    tableHeight: PropTypes.number,
    loading: PropTypes.bool,
    noDataFoundText: PropTypes.any,
    tableTitle: PropTypes.string,
    tableFooterExtra: PropTypes.any,
};
CustomTable.defaultProps = {
    columns: [],
    dataSource: [],
    rowKey: (record) => record.id,
    tableProps: {},
    rowExpandable: false,
    tableBorder: false,
    tableHeight: 265,
    loading: false,
    rowExpandablePlacement:'left' 
};

export default CustomTable;

function Row(props) {
    const { columns, rowKey, rowExpandable, expandedRowRender, record, index ,rowExpandablePlacement='left'} =
    props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root} hover key={rowKey(record)}>
                { rowExpandablePlacement === 'left' &&  rowExpandable ? (
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                ) : null }
                
                {columns.map(({ tableCellProps = {}, key, render, dataIndex }) => {
                    return (
                        <TableCell {...tableCellProps} key={`${key}-${rowKey(record)}`}>
                            {render
                                ? render(record[dataIndex], record, index)
                                : record[dataIndex]}
                        </TableCell>
                    );
                })}
                { rowExpandablePlacement === 'right' &&  rowExpandable ? (
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                ) : null }
            </TableRow>
            {rowExpandable ? (
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan="100%">
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                {expandedRowRender && expandedRowRender(record)}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            ) : null}
        </React.Fragment>
    );
}
Row.propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    rowKey: PropTypes.func,
    tableProps: PropTypes.object,
    rowExpandable: PropTypes.bool,
    expandedRowRender: PropTypes.func,
    record: PropTypes.object,
    index: PropTypes.number,
};

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
