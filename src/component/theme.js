import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#102B43'
        },
        secondary: {
            main: '#ffb400'
        },
        comment: {
            main: '#a0b8d0'
        },
        common: {
            success: {
                main: '#17c671'
            },
            info: {
                main: '#00b8d8'
            },
            warning: {
                main: '#ffb400'
            },
            light: {
                main: '#e9ecef'
            },
            dark: {
                main: '#212529'
            },
            grey: {
                main: '#d9d9d9'
            },
            blue: 'blue',
            red: {
                main: '#dd2919'
            },
            classroom:{
                main:'#13c16a'
            },
            lectures:{
                main:'#8627ce'
            },
            assignment:{
                main:'#2ccbd6'
            },
            quiz:{
                main:'#ff9b19'
            },
            student:{
                main:'#166ee2'
            },
            refer:{
                main:'#2e577e',
                text:'#3a6b99',
            },
            teacher:{
                main:'#ff6363'
            },
            upload:{
                main:'#0a86fb'
            },
            link:{
                main:'#2a94dc'
            }
        }
    },
    status: {
        danger: 'orange',
    },
    typography: {
        htmlFontSize: 18,
        fontFamily: 'MyriadPro',
        h1: {
            // fontSize: '22px',
            fontSize: '2.2rem',
            lineHeight: 1.2,
            // color: '#000000'
        },
        h2: {
            // fontSize: '18px',
            fontSize: '1.8rem',
            lineHeight: 1.2,
            // color: '#000000'
        },
        h3: {
            // fontSize: '16px',
            fontSize: '1.5rem',
            lineHeight: 1.2,
            // color: '#3D3C3C'
        },
        h4: {
            // fontSize: '14px',
            fontSize: '1.2rem',
            lineHeight: 1.2,
            // color: '#3D3C3C'
        },
        h5: {
            // fontSize: '13px',
            fontSize: '1rem',
            lineHeight: 1.2,
            // color: '#888888'
        },
        h6: {
            // fontSize: '12px',
            fontSize: '.8rem',
            lineHeight: 1.2,
            // color: '#888888'
        },
        body1: {
            fontSize: '12px',
            lineHeight: '1.5',
            // color: '#888888'
        },
        button: {
            textTransform: 'initial',
            color:'#fff'
        }
    },
    drawerWidth: 300,
    mixins: {
        toolbar: {
            minHeight: 42,
            '@media (min-width:0px) and (orientation: landscape)': {minHeight: 38},
            '@media (min-width:600px)': {minHeight: 50}
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                fontFamily: 'MyriadPro',
            },
        },
        MuiPaper:{
            elevation1: {
                boxShadow: '5px 5px 20px 0px rgba(86, 86, 86, 0.07)'
            }
        },
        MuiAppBar: {
            root: {
                backgroundColor: '#FFFFFF'
            },
            colorDefault: {
                backgroundColor: '#FFFFFF'
            }
        },
        MuiButton: {
            root: {
                borderRadius: 5,
            },
            containedPrimary:{
                color:'#166EE2!important',
                '&:hover':{
                    color:'#166EE2',
                }
            }
        },
        MuiDrawer:{
            paper:{
                top: 'unset'
            },
            paperAnchorDockedLeft:{
                borderRight: 'unset'
            }
        },
        MuiSwitch:{
            track:{
                backgroundColor:'#000'
            }
        }
    }
});



export default theme;
