import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const DialogTitle = withStyles(theme => ({
    closeButton: {
        color: theme.palette.grey[500],
    },
    dialogTitleContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight:50
    },
    leftDiv:{
        display: 'flex',
        alignItems: 'center',
        width:'100%'
    },
    dialogTitleRoot:{
        padding: theme.spacing(1,2,0,2),
        borderBottom: `1px solid ${theme.palette.grey['A100']}`,
        marginBottom:theme.spacing(1)
    }
}))(props => {
    const { children, classes, onClose,leftAction } = props;
    return (
        <MuiDialogTitle
            className={classes.dialogTitleRoot}
        >
            <div className={classes.dialogTitleContainer}>
                <div className={classes.leftDiv}>
                    {leftAction}
                    <Typography variant="h4">
                        {children}
                    </Typography>
                </div>
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon fontSize='medium' />
                    </IconButton>
                ) : null}
            </div>
        </MuiDialogTitle>
    );
});

export default DialogTitle;
