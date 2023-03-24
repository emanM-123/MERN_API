import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import React from 'react';

const DialogActions = withStyles(theme => ({
    dialogActionRoot:{
        padding: theme.spacing(2,3,1,3),
        borderTop: `1px solid ${theme.palette.grey['A100']}`,
        marginBottom:theme.spacing(1)
    }
}))(props => {
    const { children, classes } = props;
    return (
        <MuiDialogActions
            className={classes.dialogActionRoot}
            // disableTypography
        >
            {children}
        </MuiDialogActions>
    );
});

export default DialogActions;
