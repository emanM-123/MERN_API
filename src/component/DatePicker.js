import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles=makeStyles((theme)=>({
    datePicker:{
        '& .MuiIconButton-root':{
            padding:'0px',
            color:theme.palette.primary.main
        },
        '& .MuiInputBase-root':{
            backgroundColor: theme.palette.common.white,
        }
    }
}));

function DatePicker(props) {
    const classes=useStyles();
    const { ...otherProps } = props;
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={classes.datePicker}
                fullWidth
                disableToolbar
                margin="dense"
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                shouldCloseOnSelect={true}
                {...otherProps}
            />
        </MuiPickersUtilsProvider>
    );
}

export default DatePicker;
