import React from 'react';
import Textarea from '@material-ui/core/TextareaAutosize';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const TextareaAutosize = withStyles((theme) => ({
    textarea_root: {
        width: 535,
        borderRadius: 4,
        outline: 'none',
        fontFamily: 'MyriadPro',
        padding: '8.5px',
        '&:focus': {
            border: `2px solid ${theme.palette.primary.main}`,
        },
    },
}))((props) => {
    const { classes, error=false,helperText, ...otherProps } = props;
    return (
        <>
            <Textarea className={classes.textarea_root} {...otherProps} />
            <FormHelperText error={error}>{helperText ?? ''}</FormHelperText>
        </>
    );
});

export default TextareaAutosize;
