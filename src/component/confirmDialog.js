import React from 'react';
import { confirmable } from 'react-confirm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from './DialogTitle';
import PropTypes from 'prop-types';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class ConfirmDialog extends React.Component {

    static propTypes =  {
        Body: PropTypes.node,
        cancel: PropTypes.any,
        cancelLabel: PropTypes.string,
        confirmation: PropTypes.any,
        content: PropTypes.any,
        dismiss: PropTypes.any,
        modal: PropTypes.any,
        okLabel: PropTypes.string,
        proceed: PropTypes.any,
        show: PropTypes.bool,
        title: PropTypes.string,
        showCancel:PropTypes.bool,
        titleImg: PropTypes.any,
    };

    render() {

        const {
            okLabel = 'OK',
            cancelLabel = 'Cancel',
            title,
            confirmation,
            show,
            proceed,
            dismiss,
            cancel,
            modal,
            content,
            showCancel=true,
            titleImg,
            okBtnProps={}
        } = this.props;
        
        return (
            <ThemeProvider theme={theme}>
                <Dialog
                    fullWidth
                    id="ln-confirm-dialog"
                    maxWidth="xs"
                    modal={modal}
                    onClose={showCancel?dismiss:()=>{}}
                    open={show}
                >
                    {titleImg? <Box display= 'flex'  flexDirection='column' alignItems='center' >
                        <Box>
                            {titleImg}
                        </Box>
                        <Typography variant="h3">
                            {title}
                        </Typography>
                    </Box> :<DialogTitle onClose={dismiss}>
                        {title}
                    </DialogTitle>}
                    <DialogContent>
                        <DialogContentText>
                            {typeof confirmation === 'string' ? (
                                <Typography
                                    variant='h5'
                                    component='span'
                                >
                                    {confirmation}
                                </Typography>
                            ) : confirmation}
                        </DialogContentText>
                        {
                            content &&
                            <DialogContentText>
                                {content}
                            </DialogContentText>
                        }
                    </DialogContent>
                    <DialogActions>
                        {showCancel && <Button
                            color="primary"
                            onClick={cancel}
                        >
                            {cancelLabel}
                        </Button>}
                        <Button
                            color="primary"
                            onClick={proceed}
                            {...okBtnProps}
                        >
                            {okLabel}
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        );
    }
}


export default confirmable(ConfirmDialog);
