import React from 'react';
import ButtonMUI from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const Button = withStyles(() => ({
    root:{
        borderRadius:5,
    }
}))((props) => {
    const { children, loading = false, ...otherProps } = props;

    return (
        <ButtonMUI disabled={loading} {...otherProps}>
            {loading ? (
                <CircularProgress style={{ width: 21, height: 21 }} fontSize="small" />
            ) : (
                children
            )}
        </ButtonMUI>
    );
});

export default Button;