import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles(theme => ({
    filterDiv:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        lineHeight:'0px'
    },
    selectTextField:{
        '& select':{
            textTransform:'capitalize',
            width:'100%',
            backgroundColor: theme.palette.common.white,
            color: theme.palette.grey[600],
        }
    },
    inputLabel:{
        marginTop:'10px',
        color:  theme.palette.common.black[600],
 
    },
    marginZero:{
        marginTop: 0,
        marginBottom:0
    }
}));

function SelectInput({label,marginZero=false,leftSideLabel,options,selectProps,valueKey='value',labelKey='name',selectTextFieldClass,selectDivProps={},...otherProps}) {
    const classes = useStyles();

    return (
       
        <div className={classes.filterDiv} {...selectDivProps}>
            {leftSideLabel ?<><InputLabel className={classes.inputLabel}>{leftSideLabel}</InputLabel>  &nbsp; &nbsp;&nbsp;</>:''}
            <FormControl variant='outlined' style={{margin:0}}>
                <TextField
                    // id="class-basic-info-permission"
                    label={label}
                    select
                    fullWidth
                    margin='dense'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    
                    classes={{
                        root:marginZero?classes.marginZero:''
                    }}
                    SelectProps={{
                        native: true,
                        className:selectTextFieldClass?selectTextFieldClass: classes.selectTextField
                    }}
                   
                    variant="outlined"
                    {...selectProps}
                    {...otherProps}
                >
                    {options.length && options.map((each)=>{
                        const {disabled=false}=each;
                        return <option style={{textTransform:'capitalize'}} key={each[labelKey]}disabled={disabled} value={each[valueKey]}>{each[labelKey]}
                        </option>;
                    })}
                </TextField>
            </FormControl>
        </div>
         
    );
}

export default SelectInput;
