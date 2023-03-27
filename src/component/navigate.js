
import { Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';



function NavBar() {

    const navigate = useNavigate();
    const handleLogout = () => {        
        window.localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <footer>
            <Toolbar style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Button variant='contained' onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </footer>
    )
}

export default NavBar;