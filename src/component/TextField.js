import MUITextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';


const  TextField = withStyles(() => ({
    root:{
        width:'100%',
        '& input':{
            padding: '11.5px 14px',
        },
        '& select':{
            padding: '11.5px 14px'
        }
    }
}))(MUITextField);

export default TextField;