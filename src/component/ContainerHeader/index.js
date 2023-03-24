import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( ()=> ({
    containerHeader: {
        // padding: '10px 25px 0px 25px',
        paddingBottom:'24px',
        marginBottom: 0,
        backgroundColor: 'transparent',
        lineHeight: '40px',
        borderBottom: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: '2em',
        margin: 0,
        textTransform: 'capitalize',
        lineHeight: '40px',
        fontWeight: 600,
        // fontFamily: 'Montserrat Medium',
        color: '#252525'
    },
    alignCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
      
}));

export default function ContainerHeader({title,extra,headerRootProps={}}) {
    const classes = useStyles();
    return (
        title ||extra ?  <div
            className={
                classes.containerHeader
            }
            {...headerRootProps}
        >
            <Typography variant='h4' className={classes.headerTitle}>{title} </Typography>
            {extra}
        </div> :null
    );
    
}
ContainerHeader.propTypes = {
    title: PropTypes.any,
    extra: PropTypes.any,
    headerRootProps:PropTypes.object
};


