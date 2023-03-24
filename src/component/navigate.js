
import { AppBar, Toolbar, styled, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Header = styled(AppBar)(
    `background:white`
)
const Tabs = styled(NavLink)(`
    font-size:20px;
    margin-right:20px;
    text-decoration:none;
    color:inherit;
`)


function NavBar() {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
        window.localStorage.removeItem('token');
    }
    return (
        <Header>
            <Toolbar style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Button variant='contained' onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </Header>
    )
}

export default NavBar;